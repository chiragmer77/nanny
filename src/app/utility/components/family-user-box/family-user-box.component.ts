import { Router } from '@angular/router';
import { ChatService } from './../../../private-modules/modules/chat-module/services/chat.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { CommonService, SharedService } from '@app/core';
import {
  UserTypeEnum,
  continentData,
  countryData,
  durationOfStayData,
} from '@app/helpers';
import { SignalRService } from '@app/private-modules/modules/chat-module/services/SignalR.service';

@Component({
  selector: 'app-family-user-box',
  templateUrl: './family-user-box.component.html',
  styleUrls: ['./family-user-box.component.scss'],
})
export class FamilyUserBoxComponent {
  @Input() user!: any;
  @Output() removeFavoriteForParent = new EventEmitter();
  @Output() itemClick = new EventEmitter();
  countryAndContinentList = [...continentData, ...countryData];
  durationOfStayList = durationOfStayData;
  userDetail: any;
  userTypeEnum = UserTypeEnum;
  userPhotos: any[] = [];
  selectedPicture: any;

  private familyFavoriteSubscriber$!: Subscription;

  constructor(
    public dialog: MatDialog,
    private sharedService: SharedService,
    private commonService: CommonService,
    private chatService: ChatService,
    private router: Router,
    private signalRService:SignalRService
  ) {}

  ngOnInit(): void {
    this.userDetail = this.sharedService.getUser();
    this.setPhotos();
    // this.signalRService.addTransferChartDataListener((data) => {
    // //  console.log('Family data =>', data);
    //  // this.onGetMessageApiCall()
    // });
    // this.signalRService.messageReceived$.subscribe(message => {
    //   console.log('Family message', message)
    //   this.router.navigate(['/chat']);
    // });
  }

  ngOnDestroy(): void {
    if (this.familyFavoriteSubscriber$) {
      this.familyFavoriteSubscriber$.unsubscribe();
    }
  }
  
  setPhotos = () => {
    const profilePhoto = this.user.profilePhoto || this.user.profilePicture;
    this.userPhotos = [
      ...(profilePhoto ? [{ id: 0, src: profilePhoto, isSelected: true }] : []),
      ...this.user.otherPhotos.map((e: string, i: number) => {
        return { id: i + 1, src: e, isSelected: false };
      }),
    ];
    this.selectedPicture = this.userPhotos.find((e) => e.isSelected);
  };

  onClickImage = (event: any, photo: any) => {
    event.stopPropagation();
    this.selectedPicture = { ...photo };
  };

  onSendInvite = (event: any, user: any) => {
    event.stopPropagation()
    console.log('family =>', user);

    const params = {
      id: this.user.id,
      age : this.user.age,
      firstName :this.user.firstName + ' ' + (this.user.lastName !== undefined ? this.user.lastName : ''),
      city:this.user.presentCity,
      country:this.user.presentCountry,
      continent:this.user.continent,
      profilePhotoName: this.user.profilePhoto || this.user.profilePicture,
      profilePhoto: this.user.profilePhoto || this.user.profilePicture,
      unreadCount:0,
      totalCount:0
    };
    localStorage.setItem('selectedUser',JSON.stringify(params))
    this.router.navigate(['/chat']);
    // this.chatService.addChatMessage(params).subscribe({
    //   next: (res) => {
        
    // this.signalRService.invokeServerMethod('SendMessage', [this.userDetail.userId, user.id, `Hi, ${user.firstName}`]);
    //     this.router.navigate(['/chat']);
    //   },
    //   error: (e) => {},
    // });

  }

  onClickUserItem(user: any) {
    this.itemClick.emit({ user })
  }

  onClickFavoriteFamily = (event: any, user: any) => {
    event.stopPropagation();
    if (this.userDetail?.userType === UserTypeEnum.AU_PAIR) {
      const params = { favoriteId: user.id };

      let apiEndpoint = user.favorite
        ? this.removeFavorite(params)
        : this.addFavorite(params);

      if (this.familyFavoriteSubscriber$) {
        this.familyFavoriteSubscriber$.unsubscribe();
      }
      this.familyFavoriteSubscriber$ = apiEndpoint.subscribe({
        next: (res) => {
          if (user.favorite) {
            this.removeFavoriteForParent.emit({ user });
          }
          user.favorite = !user.favorite;
        },
        error: (e) => {},
      });
    }
  };

  addFavorite = (params: any): Observable<any> => {
    return this.commonService.addFavorite(params);
  };

  removeFavorite = (params: any) => {
    return this.commonService.removeFavorite(params);
  };

  getCountryName = (country: number) => {
    return this.countryAndContinentList.find((e) => e.value === country)?.text;
  };

  getDuration = (duration: number) => {
    return this.durationOfStayList.find((e) => e.value === duration)?.text;
  };
}
