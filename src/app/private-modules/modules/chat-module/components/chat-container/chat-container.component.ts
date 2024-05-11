import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { ChatService } from '../../services';
import { CallNotificationDialogComponent } from '@app/utility/components/call-notification-dialog/call-notification-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CallType } from '../../models/callType';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss'],
})
export class ChatContainerComponent implements OnInit {
  selectUserId: any = 0;
  userList: any[] = [];
  userListBackup: any[] = [];
  showMessageChat = true;
  showConversationList = true;
  isContactListEmpty: boolean = false;
  mediaQuery = window.matchMedia('(max-width: 767px)');
  selectedUser: any = null;
  isCallEnabled: boolean = false;
  type:any='video';
  constructor(private chatService: ChatService, public dialog: MatDialog,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const selectedUserJson = localStorage.getItem('selectedUser');
    this.selectedUser = selectedUserJson ? JSON.parse(selectedUserJson) : null;
    this.chatService.getChatContactsById({}).subscribe({
      next: (res) => {
        if (res.payload.length > 0) {
          this.userList = res.payload;
          this.userListBackup = [...res.payload]; // Backup the original list
          this.handleUserSelection();
          this.updateChatService();
        } else if (this.selectedUser) {
          this.addSelectedUserToList();
        } else {
          this.isContactListEmpty = true;
        }
      },
      error: (e) => {
        // Handle errors appropriately
      },
    });

    if (this.mediaQuery.matches) {
      this.showMessageChat = false;
    }

    if (this.mediaQuery.matches) {
      this.showConversationList = false;
    }
  }
  handleUserSelection() {
    if (this.selectedUser) {
      const filteredUserIndex = this.userList.findIndex(
        (user) => user.id === this.selectedUser.id
      );
      if (filteredUserIndex !== -1) {
        const filteredUser = this.userList[filteredUserIndex];
        this.userList.splice(filteredUserIndex, 1);
        filteredUser.unreadCount = 0;
        this.userList.unshift(filteredUser);
        this.selectUserId = filteredUser.id;
      } else {
        this.addSelectedUserToList();
      }
    } else {
      this.selectFirstUser();
    }
  }

  selectFirstUser() {
    this.selectUserId = this.userList[0].id;
    this.userList[0].unreadCount = 0;
  }
  onCallNotification(data: any) {
    var user = this.userList.find((x) => x.id == data.content.fromRequestId);
    if (user && (data.content.callType == CallType.Incoming||data.content.callType == CallType.AudioOnly)) {
      if(data.content.callType == CallType.AudioOnly){
        this.type='audio';
      }
      const dialogData = {
        message: data.content.callType == CallType.AudioOnly ? `Voice call from ${user.firstName}...`: `Video call from ${user.firstName}...`,
        rejectButtonText: 'Reject',
        acceptButtonText: 'Accept',
      };

      const dialogRef = this.dialog.open(CallNotificationDialogComponent, {
        width: '300px',
        data: dialogData,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.isCallEnabled = false;
          this.selectUserId = user.id;
          const index = this.userList.findIndex((obj) => obj.id === user.id);
          if (index > 0) {
            const [objectToMove] = this.userList.splice(index, 1);
            this.userList.unshift(objectToMove);
          }
          this.userList = this.userList.slice();
          this.isCallEnabled = true;
          this.cdr.detectChanges();
        }
        else{
        data.service.invokeServerMethod('SendCallNotificationMessage', [user.id, data.content.callType === CallType.AudioOnly ? CallType.AudioCallRejected : CallType.Rejected]);
        }
      });
    }
  }
  updateChatService() {
    this.chatService.updateChat(this.selectUserId).subscribe({
      next: (res) => {
        // Handle response if needed
      },
      error: (e) => {
        // Handle errors if needed
      },
    });
  }

  addSelectedUserToList() {
    this.userList.unshift(this.selectedUser);
    this.selectUserId = this.selectedUser.id;
  }
  // Page events
  onClickMessageUser = (event: boolean) => {
    this.showMessageChat = event;
  };

  onClickBackArrow = () => {
    this.showMessageChat = false;
  };

  refreshUserList = (list: any) => {
    if (list) {
      this.userList = list;
    }
  };

  onSelectUser = (id: number | string) => {
    this.selectUserId = id;
    this.isCallEnabled = false;
    this.showMessageChat = true;
  };

  onSelectCountry = (id: number | string) => {
    if (id === 'all') {
      this.userList = this.userListBackup;
    } else {
      this.userList = this.userListBackup.filter(
        (item) => item.continent === id
      );
    }

    if (this.userList.length) {
      this.selectUserId = this.userList[0].id;
    } else {
      this.selectUserId = -1;
    }
  };
}
