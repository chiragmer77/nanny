import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, SharedService } from '@app/core';
import { ToastrService } from 'ngx-toastr';

import {
  RouteConstant,
  UploadPhotoTypeEnum,
  continentData,
  countryData,
  durationOfStayData,
  familyTypeData,
  familyStatusData,
  hostKidAgeGroupData,
} from '@app/helpers';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-family-view-profile',
  templateUrl: './family-view-profile.component.html',
  styleUrls: ['./family-view-profile.component.scss'],
})
export class FamilyViewProfileComponent implements OnInit {
  @Input() familyId: any;
  @Input() profileNumber!: string;
  @Input() familyDetailFromParent!: any;
  @Output() close = new EventEmitter();
  @Output() nextClick = new EventEmitter();
  @Output() previousClick = new EventEmitter();

  countryAndContinentList = [...continentData, ...countryData];
  userDetail!: any;
  familyDetail: any;
  isLoading = false;

  closeIcon = "closeIcon"
  pictureType: any;
  previewPictures: any[] = [];
  uploadPhotoTypeEnum = UploadPhotoTypeEnum;
  encodedUrl:string='';

  private familyFavoriteSubscriber$!: Subscription;

  private getFamilyUserDetailSubscriber$!: Subscription;

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    public router: Router,
    public activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    // public dialog: MatDialogRef<FamilyViewProfileComponent>
  ) { }

  ngOnInit() {
    this.userDetail = this.sharedService.getUser();
    if (this.familyDetailFromParent) {
      this.familyDetail = { ...this.familyDetailFromParent };
    } else {
      this.bindFamilyDetail();
    }
  
    this.encodedUrl=this.commonService.copyProfileUrl(this.profileNumber);
    if(this.encodedUrl !='' && this.encodedUrl !=null){
     this.encodedUrl = encodeURIComponent(this.encodedUrl);
    }
    this.activeRoute.url.subscribe((event) => {
      this.closeIcon = event[0].path
    });
  }

  ngOnDestroy() {
    if (this.getFamilyUserDetailSubscriber$) {
      this.getFamilyUserDetailSubscriber$.unsubscribe();
    }
    if (this.familyFavoriteSubscriber$) {
      this.familyFavoriteSubscriber$.unsubscribe();
    }
  }

  onClickShare() {
    this.commonService.getUserByProfileNumber({
      profileNumber: this.familyDetail.profileNumber
    }).subscribe({
      next: () => this.close.emit()
    });
  }

  onCopyUrl() {
    this.commonService.copyProfileUrl(this.familyDetail.profileNumber);
    this.ShowMessage('Profile url copied');
  }

  onChatClick(event: any) {
    event.stopPropagation()
    const params = {
      id: this.familyDetail.id,
      age : this.familyDetail.age,
      firstName :this.familyDetail.firstName + ' ' + (this.familyDetail.lastName !== undefined ? this.familyDetail.lastName : ''),
      city:this.familyDetail.presentCity,
      country:this.familyDetail.presentCountry,
      continent:this.familyDetail.continent,
      profilePhotoName: this.familyDetail.profilePhoto || this.familyDetail.profilePicture,
      profilePhoto: this.familyDetail.profilePhoto || this.familyDetail.profilePicture,
      unreadCount:0,
      totalCount:0
    };
    localStorage.setItem('selectedUser',JSON.stringify(params));
    this.onCloseDialog();
    this.router.navigate(['/chat']);
  }

  updateFamily = () => {
    this.bindFamilyDetail();
  }

  bindFamilyDetail = () => {
    this.isLoading = true;
    if (this.getFamilyUserDetailSubscriber$) {
      this.getFamilyUserDetailSubscriber$.unsubscribe();
    }
    let familyApi: Observable<any>;
    if (this.familyId) {
      familyApi = this.commonService.getFamilyById({ Id: this.familyId });
    } else if (this.familyId === 0 && this.profileNumber) {
      familyApi = this.commonService.getUserByProfileNumber({
        profileNumber: this.profileNumber,
      });
    } else {
      familyApi = this.commonService.getFamilyProfile();
    }

    this.getFamilyUserDetailSubscriber$ = familyApi.subscribe({
      next: (res) => {
        this.handleGetFamilyDetailResponse(res);
      },
      error: (e) => {
        this.isLoading = false;
      },
    });
  };

  handleGetFamilyDetailResponse = (res: any) => {
    this.familyDetail = res.payload;
    this.isLoading = false;
  };

  onClickImage = (idx: number) => {
    const profilePhoto = this.familyDetail.profilePhoto || this.familyDetail.profilePicture;
    this.previewPictures = [...profilePhoto ? [{ id: 0, src: profilePhoto, isSelected: idx === 0 }] : [],
    ...this.familyDetail.otherPhotos.map((e: string, i: number) => {
      return { id: i + 1, src: e, isSelected: idx === i + 1 };
    })];
    this.pictureType = "image"
  }

  onCloseSlider = () => {
    this.pictureType = undefined
    this.previewPictures = [];
  }

  onClickPrevious = () => {
    this.previousClick.emit()
  }

  onClickNext = () => {
    this.nextClick.emit()
  }

  getDuration = (duration: number) => {
    return durationOfStayData.find((e) => e.value === duration)?.text;
  };

  getStatus = (duration: number) => {
    return familyStatusData.find((e) => e.value === duration)?.text;
  };

  getFamilyType = (familyType: number) => {
    return familyTypeData.find((e) => e.value === familyType)?.text;
  };

  getListKidsAgeGroup = (listKidsAgeGroup: string = '') => {
    let kidsAgeArr: any = listKidsAgeGroup?.split(',') || [];
    kidsAgeArr = kidsAgeArr.map((e: any) => {
      return hostKidAgeGroupData.find((h) => h.value === e)?.text;
    });
    return kidsAgeArr.join(',');
  };

  onCloseDialog() {
    this.close.emit();
  }

  onEditProfile = () => {
    this.router.navigate([`/${RouteConstant.FAMILY_EDIT_PROFILE_ROUTE}`]);
  };

  onClickFavoriteFamily = (user: any) => {
    // if (this.userDetail?.userType === UserTypeEnum.AU_PAIR) {
    const params = { favoriteId: this.familyId };

    let apiEndpoint = user.favorite
      ? this.removeFavorite(params)
      : this.addFavorite(params);

    if (this.familyFavoriteSubscriber$) {
      this.familyFavoriteSubscriber$.unsubscribe();
    }
    this.familyFavoriteSubscriber$ = apiEndpoint.subscribe({
      next: (res) => {
        if (user.favorite) {
          // this.removeFavoriteForParent.emit({ user });
        }
        user.favorite = !user.favorite;
      },
      error: (e) => { },
    });
    // }
  };

  addFavorite = (params: any): Observable<any> => {
    this.ShowMessage('Added to favorites');
    return this.commonService.addFavorite(params);
  };

  removeFavorite = (params: any) => {
    this.ShowMessage('Removed from favorites');
    return this.commonService.removeFavorite(params);
  };

  ShowMessage( message: any) {
    this.toastr.success('', message, {
      timeOut: 2000,
      positionClass: 'toast-bottom-center',
    });
  }
  getCountryName = (country: number) => {
    return this.countryAndContinentList.find((e) => e.value === country)?.text;
  };


}
