import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  continentData,
  countryData,
} from '@app/helpers/constants/aupair.options';
import { ChatService } from '../../services';
import { Subject, takeUntil } from 'rxjs';
import { SharedService } from '@app/core/services/shared.service';

interface Country {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss'],
})
export class ConversationListComponent implements OnInit,OnChanges, OnDestroy {
  @Output() selectUser = new EventEmitter();
  @Output() selectCountry = new EventEmitter();
  @Output() showMessageDetail = new EventEmitter(false);
  @Input() userList: any[] = [];
  @Input() selectUserId: number = 0;
  private destroy: Subject<any> = new Subject();
  activeUser: number = 0;
  continentData = continentData;
  countryData = countryData;
  country: Country[] = [
    { value: 'north america', viewValue: 'North America' },
    { value: 'india', viewValue: 'India' },
    { value: 'canada', viewValue: 'Canada' },
  ];
  selectedCountry = this.country[0].value;
  loggedInUser: any;
  constructor(
    private chatService: ChatService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this.sharedService.getUser();
    this.chatService.otherMessagesEvent
      .pipe(
        takeUntil(this.destroy) // import takeUntil from rxjs/operators.
      )
      .subscribe((data: any) => {
        if (data != null) {
          const currentUser = this.userList.find(
            (item) => item.id === data.sentById
          );
          if (currentUser) {
            this.userList.forEach((user) => {
              if (user.id === data.sentById) {
                user.unreadCount += 1;
              }
            });
          } else {
            this.chatService.getChatContactBySenderId(data.sentById).subscribe({
              next: (res) => {
                if (res.payload != null) {
                  this.userList.unshift(res.payload);
                }
              },

              error: (e) => {},
            });
          }
        }
      });

      this.chatService.messageSenderUserEvent
      .pipe(
        takeUntil(this.destroy) 
      )
      .subscribe((data: any) => {
        if (data != null) {
          const filteredUserIndex = this.userList.findIndex(user => user.id === data);
          if (filteredUserIndex !== -1) {
            const filteredUser = this.userList[filteredUserIndex];
            this.userList.splice(filteredUserIndex, 1); 
            this.userList.unshift(filteredUser);
            this.activeUser=0; 
          }
        }
      });
  }

  // selectCountry(event: Event) {
  //   this.selectedCountry = (event.target as HTMLSelectElement).value;
  // }

  // Page events
  onClickMessageUser = () => {
    this.showMessageDetail.emit(true);
  };

  onChangeCountry(value: any) {
    this.selectCountry.emit(value);
  }
  ngOnDestroy() {
    this.destroy.next(null);
  }
  ngOnChanges(){
    this.activeUser= this.userList.findIndex((obj) => obj.id === this.selectUserId);
  }
  getCountryName(id: any): string {
    if (id) {
      let data: any = countryData.find((item) => {
        return item.value == id;
      });
      return data.text;
    } else return '';
  }
  onSelectUser(id: number, index: number) {
    this.activeUser = index;
    const currentUser = this.userList.find((item) => item.id === id);
    if (currentUser.unreadCount > 0) {
      this.userList.forEach((user) => {
        if (user.id === id) {
          user.unreadCount = 0;
        }
      });
      this.chatService.updateChat(id).subscribe({
        next: (res) => {},
        error: (e) => {},
      });
    }
    this.selectUser.emit(id);
  }
}
