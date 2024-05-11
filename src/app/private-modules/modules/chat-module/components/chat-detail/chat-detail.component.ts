import { environment } from '@env/environment';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  AfterViewChecked,
  SimpleChanges,
  ViewChild,
  Output,
  EventEmitter,
  OnDestroy,
  NgZone,
} from '@angular/core';
import { ChatService } from '../../services';
import * as moment from 'moment';
import { SharedService, SnackBarService } from '@app/core';
import * as signalR from '@microsoft/signalr';
import { SignalRService } from '../../services/SignalR.service';
import { Subject, takeUntil } from 'rxjs';
import { VideoContainerComponent } from '../video-container/video-container.component';
import { MatDialog } from '@angular/material/dialog';
import { JitsiService } from '../../services/jitsi.service';
import { ConfirmationBoxComponent } from '@app/utility/components/confirmation-box/confirmation-box.component';
import { TranslateService } from '@ngx-translate/core';
import { CallType } from '../../models/callType';
import { MessageType } from '../../models/messageType';


@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})
export class ChatDetailComponent
  implements OnInit, OnChanges, AfterViewChecked, OnDestroy
{
  @Input() userId: number | string = 0;
  @Input() userList: any[] = [];
  @Input() isCallEnabled:boolean = false;
  @Input() type:any = "video";
  @Output() showConversationList = new EventEmitter(false);
  @Output() BlockOrUnblockUserList = new EventEmitter(false);
  @Output() CallNotification = new EventEmitter<CallNotificationEvent>(false);
  messageList: any[] = [];
  userDetail: any;
  selectedUserDetails: any;
  sendInputValue: string = '';
  videoDialogRef!: any;
  // connection: any;
  isChatSelected: boolean = false;
  toggled: boolean = false;
  isBlockedOn: boolean = false;
  userBlocked: boolean = false;
  private destroy: Subject<any> = new Subject();
  @ViewChild('scrollBottom') private scrollBottom!: ElementRef;
  @ViewChild('inputRef') private inputRef!: ElementRef;
  groupedMessages!: GroupedMessage[];

  constructor(
    private chatService: ChatService,
    private sharedService: SharedService,
    private signalRService: SignalRService,
    private snackBarService: SnackBarService,
    private jitsiService: JitsiService,
    public dialog: MatDialog,
    private ngZone: NgZone,
    private translate: TranslateService
  ) {}

  sendMessage(user: string, message: string): void {
    //return this.connection.send('SendMessage', user, message);
  }

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener((data) => {
      console.log('Data =>', data);
      // this.onGetMessageApiCall()
      this.sendInputValue = '';
    });

    this.signalRService.messageReceived$
    .pipe(takeUntil(this.destroy))
    .subscribe((message: any) => {
      const sentByCurrentUser = message.sentById === this.userId;
      const isSystemMessage = message.messageType === MessageType.SystemMessage;
      if (sentByCurrentUser || isSystemMessage) {
        let canAccessMessage = false;
        if (this.userDetail.userType === 'A') {
          const isMatchingFamily = message.familyId === this.userId;
          const isMatchingAupair = message.aupairId === this.userDetail.userId;
          if (isMatchingFamily && isMatchingAupair) {
            canAccessMessage = true;
          }
        } else {
          const isMatchingFamily = message.familyId === this.userDetail.userId;
          const isMatchingAupair = message.aupairId === this.userId;
          if (isMatchingFamily && isMatchingAupair) {
            canAccessMessage = true;
          }
        }
        if (canAccessMessage) {
          this.chatService.updateChat(message.sentById).subscribe({
            next: () => {},
            error: () => {},
          });
          this.filterMessages(message);
        } else {
          this.chatService.sendToOthers(message);
        }
      }
    });
  
    this.signalRService.blockOrUnBlockedReceived$
      .pipe(takeUntil(this.destroy))
      .subscribe((content: any) => {
        if (content) {
          if (content.requesterId == this.userDetail.userId) {
            this.userBlocked = content.isBlock;
          }
          this.userList.map((item) => {
            if (item.id == content.requesterId) {
              if (this.userDetail.userType == 'A') {
                item.familyBlockedOn = moment.utc();
              } else {
                item.aupairBlockedOn = moment.utc();
              }
            }
          });
          this.BlockOrUnblockUserList.emit(this.userList);
        }
      });

      this.signalRService.callNotification$
      .pipe(takeUntil(this.destroy))
      .subscribe((content: any) => {
        if (content) {
          if(content.callType===CallType.NoAnswer || content.callType===CallType.AudioCallNoAnswer){
            if (this.videoDialogRef) {
              this.snackBarService.setSnackBarMessage('User is not available');
              this.videoDialogRef.close();
            }
          }
          else if(content.callType === CallType.Rejected || content.callType === CallType.AudioCallRejected){
            if (this.videoDialogRef) {
              this.snackBarService.setSnackBarMessage('User is busy');
              this.videoDialogRef.close();
            }
          }
          else{
          this.CallNotification.emit({content, service :this.signalRService});
          }
        }
      });
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
    this.signalRService.stopConnection();
  }
  onClickBackArrow = () => {
    this.showConversationList.emit(true);
  };
  handleSelection(event: any) {
    this.sendInputValue += event.char;
    this.toggled = false;
    this.inputRef.nativeElement.focus();
  }
  filterMessages(content: any): void {
    let newMessage: any = {};
    var user = this.userList.find((x) => x.id == content.sentById);
    let existingUser = localStorage.getItem('selectedUser');
    if (
      existingUser != null &&
      JSON.parse(existingUser).id === content.sentById
    ) {
      localStorage.removeItem('selectedUser');
    }
    if (!user) {
      newMessage.sentByName = this.userDetail.name;
      newMessage.sentById = content.sentById;
      newMessage.profilePhoto = this.userDetail.photo;
      newMessage.message = content.messageType==MessageType.SystemMessage? JSON.parse(content.message):content.message;
      newMessage.dateAdded = content.dateAdded;
      newMessage.messageType=content.messageType;
    } else {
      newMessage = {
        message: content.messageType==MessageType.SystemMessage? JSON.parse(content.message):content.message,
        dateAdded: content.dateAdded,
        sentById: content.sentById,
        profilePhoto: user.profilePhoto,
        sentByName: user.firstName,
         messageType:content.messageType
      };
    }
    this.messageList.push(newMessage);
    this.groupMessagesByDate(this.messageList);
    this.isChatSelected = true;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (this.isChatSelected) {
      this.scrollBottom.nativeElement.scrollTop =
        this.scrollBottom.nativeElement.scrollHeight;
      this.isChatSelected = false;
    }
  }

  onSendMessage = async (value: string) => {
    if (value != '' && value != null && value.trim() != '') {
      this.sendInputValue = '';
      if(this.isBlockedOn || this.userBlocked){
        this.snackBarService.setSnackBarMessage(
          'No longer you can send any messages.'
        );
        return;
      }
      if (!this.checkMessagesArray()) {
        this.snackBarService.setSnackBarMessage(
          'You can send the message after getting the confirmation from the user.'
        );
        return;
      }


      let newMessage = {
        message: value,
        dateAdded: moment.utc().format(),
        sentById: this.userDetail.userId,
        profilePhoto: this.userDetail.photo,
      };
      this.filterMessages(newMessage);
      if (this.userDetail.userType == 'A') {
        this.signalRService.invokeServerMethod('SendMessage', [
          this.userId,
          this.userDetail.userId,
          value,
          MessageType.UserMessage
        ]);
      } else {
        this.signalRService.invokeServerMethod('SendMessage', [
          this.userDetail.userId,
          this.userId,
          value,
          MessageType.UserMessage
        ]);
      }
      this.chatService.newMessageSend(this.userId);
    }
  };
  blockOrUnBlock() {
    let dialogData: any;
    const commonDialogData = {
      title: this.translate.instant('DIALOG.CONFIRM_ACTION'),
      cancelButtonText: this.translate.instant('DIALOG.CANCEL_BUTTON_TEXT'),
      confirmButtonText: this.translate.instant('DIALOG.CONFIRM_BUTTON_TEXT'),
    };
    const messageKey = this.isBlockedOn
      ? 'DIALOG.CONFIRM_MESSAGE_UNBLOCK'
      : 'DIALOG.CONFIRM_MESSAGE_BLOCK';
    dialogData = {
      ...commonDialogData,
      message: this.translate.instant(messageKey),
    };

    const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
      width: '300px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.chatService
          .blockOrUnBlock(this.userId as number, !this.isBlockedOn)
          .subscribe({
            next: (res) => {
              if (res && res.payload) {
                this.isBlockedOn = !this.isBlockedOn;
              }
            },
            error: (e) => {
              // Handle error
            },
          });
      }
    });
  }
  onVideoClick() {
    if(this.isBlockedOn || this.userBlocked){
      this.snackBarService.setSnackBarMessage(
        'No longer you can call this user'
      );
      return;
    }
    if (!this.checkMessageVideoArray()) {
      this.snackBarService.setSnackBarMessage(
        'You can call this user after getting the confirmation from the user.'
      );
      return;
    }
    let dialogData: any;
    const commonDialogData = {
      title: this.translate.instant('DIALOG.CONFIRM_ACTION'),
      cancelButtonText: this.translate.instant('DIALOG.CANCEL_BUTTON_TEXT'),
      confirmButtonText: this.translate.instant('DIALOG.CONFIRM_BUTTON_TEXT'),
    };
  
    dialogData = {
      ...commonDialogData,
      message: 'Are you sure to have video call with this user?',
    };

    const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
      width: '300px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.chatService.conversation(payload).subscribe({
          next: (res) => {
            if (res && res.payload) {
              // Close any previously opened dialogs and cleanup subscriptions
              if (this.videoDialogRef) {
                this.videoDialogRef.close();
              }
         
              this.videoDialogRef = this.dialog.open(VideoContainerComponent, {
                panelClass: [
                  'animate__animated',
                  'animate__slideInRight',
                  'view-profile-right-dialog',
                ],
              });
    
              this.videoDialogRef.componentInstance.displayName =
                this.userDetail.name;
              this.videoDialogRef.componentInstance.meetingId =
                res.payload.meetingId;
                this.videoDialogRef.componentInstance.userId =
               this.userId;
               this.videoDialogRef.componentInstance.signalRService =
               this.signalRService;
               this.videoDialogRef.componentInstance.type =
               'video';
    
              // Ensure subscription is cleaned up when the dialog is closed
              this.videoDialogRef.componentInstance.close.subscribe((data: any) => {
                if (data && data.status === 'close') {
                  if(data.duration>0){
                    let message= {
                      type : 'Connected',
                      duration : data.duration,
                      callType: CallType.Incoming
                    }
                    let newMessage = {
                      message: JSON.stringify(message),
                      dateAdded: moment.utc().format(),
                      sentById: this.userDetail.userId,
                      profilePhoto: this.userDetail.photo,
                      messageType:MessageType.SystemMessage
                    };
                    this.filterMessages(newMessage);
                    if (this.userDetail.userType == 'A') {
                      this.signalRService.invokeServerMethod('SendMessage', [
                        this.userId,
                        this.userDetail.userId,
                       JSON.stringify(message),
                      MessageType.SystemMessage
                      ]);
                    } else {
                      this.signalRService.invokeServerMethod('SendMessage', [
                        this.userDetail.userId,
                        this.userId,
                        JSON.stringify(message),
                        MessageType.SystemMessage
                      ]);
                    }
                  }
                  if (this.videoDialogRef) {
                    this.ngZone.run(() => {
                      this.videoDialogRef.close();
                    });
                  }
                }
              });
    
              this.videoDialogRef.afterClosed().subscribe(() => {
                this.jitsiService.dispose();
              });

            }
          },
          error: (e) => {
            // Handle error
          },
        });
      }
    });
    let payload: any = {};
    if (this.userDetail.userType == 'A') {
      payload.aupairId = this.userDetail.userId;
      payload.familyId = this.userId;
    } else {
      payload.aupairId = this.userId;
      payload.familyId = this.userDetail.userId;
    }

  }
  onAudioClick() {
    if(this.isBlockedOn || this.userBlocked){
      this.snackBarService.setSnackBarMessage(
        'No longer you can call this user'
      );
      return;
    }
    if (!this.checkMessageVideoArray()) {
      this.snackBarService.setSnackBarMessage(
        'You can call this user after getting the confirmation from the user.'
      );
      return;
    }
    let dialogData: any;
    const commonDialogData = {
      title: this.translate.instant('DIALOG.CONFIRM_ACTION'),
      cancelButtonText: this.translate.instant('DIALOG.CANCEL_BUTTON_TEXT'),
      confirmButtonText: this.translate.instant('DIALOG.CONFIRM_BUTTON_TEXT'),
    };
  
    dialogData = {
      ...commonDialogData,
      message: 'Are you sure to have audio call with this user?',
    };

    const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
      width: '300px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.chatService.conversation(payload).subscribe({
          next: (res) => {
            if (res && res.payload) {
              // Close any previously opened dialogs and cleanup subscriptions
              if (this.videoDialogRef) {
                this.videoDialogRef.close();
              }
         
              this.videoDialogRef = this.dialog.open(VideoContainerComponent, {
                panelClass: [
                  'animate__animated',
                  'animate__slideInRight',
                  'view-profile-right-dialog',
                ],
              });
    
              this.videoDialogRef.componentInstance.displayName =
                this.userDetail.name;
              this.videoDialogRef.componentInstance.meetingId =
                res.payload.meetingId;
                this.videoDialogRef.componentInstance.userId =
               this.userId;
               this.videoDialogRef.componentInstance.signalRService =
               this.signalRService;
               this.videoDialogRef.componentInstance.type =
               'audio';
    
              // Ensure subscription is cleaned up when the dialog is closed
              this.videoDialogRef.componentInstance.close.subscribe((data: any) => {
                if (data && data.status === 'close') {
                  if(data.duration>0){
                    let message= {
                      type : 'Connected',
                      duration : data.duration,
                      callType: CallType.AudioOnly
                    }
                    let newMessage = {
                      message: JSON.stringify(message),
                      dateAdded: moment.utc().format(),
                      sentById: this.userDetail.userId,
                      profilePhoto: this.userDetail.photo,
                      messageType:MessageType.SystemMessage
                    };
                    this.filterMessages(newMessage);
                    if (this.userDetail.userType == 'A') {
                      this.signalRService.invokeServerMethod('SendMessage', [
                        this.userId,
                        this.userDetail.userId,
                       JSON.stringify(message),
                      MessageType.SystemMessage
                      ]);
                    } else {
                      this.signalRService.invokeServerMethod('SendMessage', [
                        this.userDetail.userId,
                        this.userId,
                        JSON.stringify(message),
                        MessageType.SystemMessage
                      ]);
                    }
                  }
                  if (this.videoDialogRef) {
                    this.ngZone.run(() => {
                      this.videoDialogRef.close();
                    });
                  }
                }
              });
    
              this.videoDialogRef.afterClosed().subscribe(() => {
                this.jitsiService.dispose();
              });

            }
          },
          error: (e) => {
            // Handle error
          },
        });
      }
    });
    let payload: any = {};
    if (this.userDetail.userType == 'A') {
      payload.aupairId = this.userDetail.userId;
      payload.familyId = this.userId;
    } else {
      payload.aupairId = this.userId;
      payload.familyId = this.userDetail.userId;
    }

  }

  checkMessagesArray(): boolean {
    return (
      this.messageList.length <= 3 ||
      this.messageList.some((item) => item.sentById === this.userId)
    );
  }
  checkMessageVideoArray():boolean{
    return (
      this.messageList.some((item) => item.sentById === this.userId && item.messageType!==MessageType.SystemMessage)
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.userDetail = this.sharedService.getUser();
    if (this.userDetail && this.userId) {
      this.onGetMessageApiCall();
    }
    this.selectedUserDetails = this.userList.find((x) => x.id == this.userId);
    if (this.userDetail.userType == 'A') {
      if (this.selectedUserDetails?.aupairBlockedOn) {
        this.isBlockedOn = true;
      }
      if (this.selectedUserDetails?.familyBlockedOn) {
        this.userBlocked = true;
      }
    } else {
      if (this.selectedUserDetails?.familyBlockedOn) {
        this.isBlockedOn = true;
      }
      if (this.selectedUserDetails?.aupairBlockedOn) {
        this.userBlocked = true;
      }
    }
    if(!this.isBlockedOn && !this.userBlocked && this.isCallEnabled){
      let payload: any = {};
      if (this.userDetail.userType == 'A') {
        payload.aupairId = this.userDetail.userId;
        payload.familyId = this.userId;
      } else {
        payload.aupairId = this.userId;
        payload.familyId = this.userDetail.userId;
      }
      this.chatService.conversation(payload).subscribe({
        next: (res) => {
          if (res && res.payload) {
            // Close any previously opened dialogs and cleanup subscriptions
            if (this.videoDialogRef) {
              this.videoDialogRef.close();
            }
            this.videoDialogRef = this.dialog.open(VideoContainerComponent, {
              panelClass: [
                'animate__animated',
                'animate__slideInRight',
                'view-profile-right-dialog',
              ],
            });
  
            this.videoDialogRef.componentInstance.displayName =
              this.userDetail.name;
            this.videoDialogRef.componentInstance.meetingId =
              res.payload.meetingId;
              this.videoDialogRef.componentInstance.userId =
              null;
              this.videoDialogRef.componentInstance.signalRService =
              this.signalRService;
              this.videoDialogRef.componentInstance.type =
              this.type;
            // Ensure subscription is cleaned up when the dialog is closed
            this.videoDialogRef.componentInstance.close.subscribe((data: any) => {
              if (data && data.status === 'close') {
                if (this.videoDialogRef) {
                  this.ngZone.run(() => {
                    this.videoDialogRef.close();
                  });
                }
              }
            });
  
            this.videoDialogRef.afterClosed().subscribe(() => {
              this.jitsiService.dispose();
            });

          }
        },
        error: (e) => {
          // Handle error
        },
      });
    }
  }

  onGetMessageApiCall = () => {
    const params = {
      userId: this.userId,
    };
    this.chatService.getChatMessages(params).subscribe({
      next: (res) => {
        res.payload?.map((item:any) => {
          if (item.messageType === MessageType.SystemMessage && typeof item.message === 'string') {
            try {
              item.message = JSON.parse(item.message);
            } catch (error) {
            }
          }
        });
        this.messageList = res.payload;
        this.isChatSelected = true;
        this.groupMessagesByDate(this.messageList);
      },
      error: (e) => {},
    });
  };
  deleteConversation() {
    this.chatService.deleteChatConversation(this.userId).subscribe({
      next: (res: any) => {
        if (res && res.payload !== null) {
          this.messageList = [];
          this.groupMessagesByDate(this.messageList);
        }
      },
      error: (e) => {},
    });
  }

  renderDate(data: string) {
    return moment.utc(data).local().format('hh:mm a');
  }
  renderGroupDate(dateAdded: string): string {
    const messageDate = moment.utc(dateAdded).local().startOf('day'); 
    const currentDate = moment().startOf('day'); 
    const yesterday = moment().subtract(1, 'days').startOf('day');
  
    if (messageDate.isSame(currentDate, 'day')) {
      return 'Today';
    } else if (messageDate.isSame(yesterday, 'day')) {
      return 'Yesterday';
    } else {
      return messageDate.format('DD/MM/YYYY');
    }
  }
  groupMessagesByDate(messages: any[]): void {
    const grouped: Record<string, any[]> = {};
  
    messages.forEach((message: any) => {
      const displayDate: string = this.renderGroupDate(message.dateAdded);
      if (!grouped[displayDate]) {
        grouped[displayDate] = [];
      }
      grouped[displayDate].push(message);
    });

    let groupedArray = Object.keys(grouped).map(date => {
      return { date, messages: grouped[date] };
    });
  
    groupedArray.sort((a, b) => {
      const specialDates: any = {
        'Today': 2,
        'Yesterday': 1
      };
      const aValue = specialDates[a.date] || 0;
      const bValue = specialDates[b.date] || 0;
    
      if (aValue && bValue) {
        return aValue - bValue;
      } else if (aValue) {
        return 1;
      } else if (bValue) {
        return -1;
      } else {
        return moment(a.date, 'DD/MM/YYYY').diff(moment(b.date, 'DD/MM/YYYY'));
      }
    });
    
    this.groupedMessages = groupedArray;
  }
  
  
  
  getMessageStatus(message: any): string {
    if (!message?.message) return '';
  
    switch (message.message.type) {
      case 'NoAnswer':
        return message.sentById !== this.userDetail.userId
        ? (message.message?.callType === CallType.AudioCallNoAnswer ? 'Missed Audio Call' : 'Missed Video Call')
        : (message.message?.callType === CallType.AudioCallNoAnswer ? 'Audio Call - No Answer' : 'Video Call - No Answer');
      case 'Busy':
        return message.sentById !== this.userDetail.userId 
        ? (message.message?.callType === CallType.AudioCallRejected ? 'Missed Audio Call' : 'Missed Video Call')
        : (message.message?.callType === CallType.AudioCallRejected ? 'Audio Call - Busy' : 'Video Call - Busy');
      default:
        return '';
    }
  }
  getIconClass(message: any, userId: number): string {
    if (message?.message?.type === 'NoAnswer') {
      return message.sentById !== userId ? 'icon-missed' : 'icon-no-answer';
    } else if (message?.message?.type === 'Busy') {
      return message.sentById !== userId ? 'icon-missed' : 'icon-no-answer';
    }
    return '';
  }
  
  getIconName(message: any, userId: number): string {
    switch (message?.message?.type) {
      case 'Connected':
        return 'call';
      case 'NoAnswer':
        return message.sentById !== userId ? 'call_missed' : 'call_missed_outgoing';
      case 'Busy':
        return message.sentById !== userId ? 'call_missed' : 'call_missed_outgoing';
      default:
        return 'call';
    }
  }
  
}
export interface CallNotificationEvent {
  content: any;
  service: any;    
}
interface GroupedMessage {
  date: string;
  messages: any[]; // Replace 'any' with your actual message type
}
