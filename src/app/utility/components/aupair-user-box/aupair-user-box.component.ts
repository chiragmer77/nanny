import { SignalRService } from './../../../private-modules/modules/chat-module/services/SignalR.service';
import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { CommonService, SharedService } from '@app/core';
import {
  UserTypeEnum,
  continentData,
  countryData,
  languageData,
  durationOfStayData,
} from '@app/helpers';
import { AupairViewProfileComponent } from '@app/private-modules/modules/view-profiles-module/components';
import { ChatService } from '@app/private-modules/modules/chat-module/services';

@Component({
  selector: 'app-aupair-user-box',
  templateUrl: './aupair-user-box.component.html',
  styleUrls: ['./aupair-user-box.component.scss'],
})
export class AupairUserBoxComponent implements OnInit {
  @Input() user!: any;
  @Output() removeFavoriteForParent = new EventEmitter();
  @Output() itemClick = new EventEmitter();
  countryAndContinentList = [...continentData, ...countryData];
  durationOfStayList = durationOfStayData;
  userDetail: any;
  userPhotos: any[] = [];
  userTypeEnum = UserTypeEnum;
  selectedPicture: any;

  private aupairFavoriteSubscriber$!: Subscription;
  aupairUserViewProfileDialogRef: any;

  constructor(
    public dialog: MatDialog,
    private sharedService: SharedService,
    private commonService: CommonService,
    private chatService: ChatService,
    private router: Router,
    private signalRService: SignalRService
  ) { }

  ngOnInit(): void {
    this.userDetail = this.sharedService.getUser();
    this.setPhotos();
    // this.signalRService.addTransferChartDataListener((data) => {
    // });
    // this.signalRService.messageReceived$.subscribe(message => {
    //   console.log('Aupair message =>', message);
    //   this.router.navigate(['/chat']);
    // });
  }

  ngOnDestroy(): void {
    if (this.aupairFavoriteSubscriber$) {
      this.aupairFavoriteSubscriber$.unsubscribe();
    }
  }

  setPhotos = () => {
    if (this.user) {
      const profilePhoto = this.user.profilePhoto || this.user.profilePicture;
      this.userPhotos = [
        ...(profilePhoto
          ? [{ id: 0, src: profilePhoto, isSelected: true }]
          : []),
        ...this.user.otherPhotos.map((e: string, i: number) => {
          return { id: i + 1, src: e, isSelected: false };
        }),
      ];
      this.selectedPicture = this.userPhotos.find((e) => e.isSelected);
    }
  };

  onClickImage = (event: any, photo: any) => {
    event.stopPropagation();
    this.selectedPicture = { ...photo };
  };

  getCountryName = (country: number) => {
    return this.countryAndContinentList.find((e) => e.value === country)?.text;
  };

  getDuration = (duration: number) => {
    return this.durationOfStayList.find((e) => e.value === duration)?.text;
  };

  onSendInvite = (event: any, user: any) => {
    event.stopPropagation()
    console.log('aupair =>', user);
    const params = {
      id: this.user.id,
      age: this.user.age,
      firstName: this.user.firstName + ' ' + (this.user.lastName !== undefined ? this.user.lastName : ''),
      city: this.user.presentCity,
      country: this.user.presentCountry,
      continent: this.user.continent,
      profilePhotoName: this.user.profilePhoto || this.user.profilePicture,
      profilePhoto: this.user.profilePhoto || this.user.profilePicture,
      unreadCount: 0,
      totalCount: 0
    };
    localStorage.setItem('selectedUser', JSON.stringify(params))
    this.router.navigate(['/chat']);
  }


  //page event
  onClickUserItem(user: any) {
    this.itemClick.emit({ user });
  }

  onClickFavoriteAupair = (event: any, user: any) => {
    event.stopPropagation();
    if (this.userDetail?.userType === UserTypeEnum.FAMILY) {
      const params = { favoriteId: user.id };
      let apiEndpoint = user.favorite
        ? this.removeFavorite(params)
        : this.addFavorite(params);
      if (this.aupairFavoriteSubscriber$) {
        this.aupairFavoriteSubscriber$.unsubscribe();
      }
      this.aupairFavoriteSubscriber$ = apiEndpoint.subscribe({
        next: (res) => {
          if (user.favorite) {
            this.removeFavoriteForParent.emit({ user });
          }
          user.favorite = !user.favorite;
        },
        error: (e) => { },
      });
    }
  };

  addFavorite = (params: any): Observable<any> => {
    return this.commonService.addFavorite(params);
  };

  removeFavorite = (params: any) => {
    return this.commonService.removeFavorite(params);
  };

  getLanguages = (listLanguageIds: string = '') => {
    let languageArr: any = listLanguageIds?.split(',') || [];
    languageArr = languageArr.map((e: any) => {
      return languageData.find((l) => l.value === e)?.text;
    });
    return languageArr.join(',');
  };
}
