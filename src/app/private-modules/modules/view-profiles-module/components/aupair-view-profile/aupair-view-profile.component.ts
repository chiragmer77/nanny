import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, SharedService } from '@app/core';
import { ToastrService } from 'ngx-toastr';

import {
  RouteConstant,
  UploadPhotoTypeEnum,
  continentData,
  countryData,
  durationOfStayData,
  educationData,
  hostKidAgeGroupData,
  languageData,
  professionData,
  religionData,
  statusesData
} from '@app/helpers';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-aupair-view-profile',
  templateUrl: './aupair-view-profile.component.html',
  styleUrls: ['./aupair-view-profile.component.scss'],
})

export class AupairViewProfileComponent implements OnInit {
  @Input() aupairId!: any;
  @Input() profileNumber!: string;
  @Input() aupairDetailFromParent!: any;
  @Output() close = new EventEmitter();
  @Output() nextClick = new EventEmitter();
  @Output() previousClick = new EventEmitter();

  closeIcon = 'closeIcon';
  pictureType: any;
  aupairDetail: any;
  userDetail!: any;
  durationOfStayList = durationOfStayData;
  countryAndContinentList = [...continentData, ...countryData];
  isLoading = false;
  previewPictures: any[] = [];
  uploadPhotoTypeEnum = UploadPhotoTypeEnum;
  private aupairFavoriteSubscriber$!: Subscription;
  private getAupairUserDetailSubscriber$!: Subscription;
  showShareOptions = false;
  encodedUrl:string='';

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    public router: Router,
    public activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    // public dialog: MatDialogRef<AupairViewProfileComponent>
  ) { }

  ngOnInit() {
    this.userDetail = this.sharedService.getUser();
    if (this.aupairDetailFromParent) {
      this.aupairDetail = { ...this.aupairDetailFromParent };
    } else {
      this.bindAupairDetail();
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
    if (this.getAupairUserDetailSubscriber$) {
      this.getAupairUserDetailSubscriber$.unsubscribe();
    }
    if (this.aupairFavoriteSubscriber$) {
      this.aupairFavoriteSubscriber$.unsubscribe();
    }
  }
  toggleShareOptions() {
    this.showShareOptions = !this.showShareOptions;
  }
  onClickShare() {
    this.commonService.getUserByProfileNumber({
      profileNumber: this.aupairDetail.profileNumber
    }).subscribe({
      next: () => this.close.emit()
    });
  }

  onCopyUrl() {
    this.commonService.copyProfileUrl(this.aupairDetail);
  }

  getStatus = (duration: number) => {
    return statusesData.find((e) => e.value === duration)?.text;
  };

  onChatClick(event: any) {
    event.stopPropagation()
    const params = {
      id: this.aupairDetail.id,
      age : this.aupairDetail.age,
      firstName :this.aupairDetail.firstName + ' ' + (this.aupairDetail.lastName !== undefined ? this.aupairDetail.lastName : ''),
      city:this.aupairDetail.presentCity,
      country:this.aupairDetail.presentCountry,
      continent:this.aupairDetail.continent,
      profilePhotoName: this.aupairDetail.profilePhoto || this.aupairDetail.profilePicture,
      profilePhoto: this.aupairDetail.profilePhoto || this.aupairDetail.profilePicture,
      unreadCount:0,
      totalCount:0
    };
    localStorage.setItem('selectedUser',JSON.stringify(params))
    this.onCloseDialog();
    this.router.navigate(['/chat']);
  }

  updateAupair = () => {
    this.bindAupairDetail();
  }

  bindAupairDetail = () => {
    if (this.getAupairUserDetailSubscriber$) {
      this.getAupairUserDetailSubscriber$.unsubscribe();
    }
    this.isLoading = true;

    let aupairApi: Observable<any>;

    if (this.aupairId) {
      aupairApi = this.commonService.getAupairById({ Id: this.aupairId });
    } else if (this.aupairId === 0 && this.profileNumber) {
      aupairApi = this.commonService.getUserByProfileNumber({
        profileNumber: this.profileNumber,
      });
    } else {
      aupairApi = this.commonService.getAupairProfile();
    }

    this.getAupairUserDetailSubscriber$ = aupairApi.subscribe({
      next: (res) => {
        this.handleGetAupairDetailResponse(res);
      },
      error: (e) => {
        this.isLoading = false;
      },
    });
  };

  handleGetAupairDetailResponse = (res: any) => {
    this.aupairDetail = res.payload;
    this.isLoading = false;
  };

  getCountryName = (country: number) => {
    return this.countryAndContinentList.find((e) => e.value === country)?.text;
  };

  getDuration = (duration: number) => {
    return this.durationOfStayList.find((e) => e.value === duration)?.text;
  };

  getProfession = (profession: string) => {
    return professionData.find((e) => e.value === profession)?.text;
  };

  getEducation = (education: number) => {
    return educationData.find((e) => e.value === education)?.text;
  };

  getReligion = (religion: number) => {
    return religionData.find((e) => e.value === religion)?.text;
  };

  getCitizen = (citizenOf: number) => {
    return countryData.find((e) => e.value === citizenOf)?.text;
  };

  getLanguages = (listLanguageIds: string = '') => {
    let languageArr: any = listLanguageIds?.split(',') || [];
    languageArr = languageArr.map((e: any) => {
      return languageData.find((l) => l.value === e)?.text;
    });
    return languageArr;
  };

  getHostKidsAge = (listHostKidsAge: string = '') => {
    let kidsAgeArr: any = listHostKidsAge?.split(',') || [];
    kidsAgeArr = kidsAgeArr.map((e: any) => {
      return hostKidAgeGroupData.find((h) => h.value === e)?.text;
    });
    return kidsAgeArr.join(',');
  };

  getCountries = (listFamilyCountries: string = '') => {
    let listFamilyCountriesArr: any = listFamilyCountries?.split(',') || [];
    listFamilyCountriesArr = listFamilyCountriesArr.map((e: any) => {
      return this.countryAndContinentList.find((h) => h.value == e)?.text;
    });
    return listFamilyCountriesArr;
  };

  onCloseDialog() {
    this.close.emit();
  }

  onEditProfile = () => {
    this.router.navigate([`/${RouteConstant.AUPAIR_EDIT_PROFILE_ROUTE}`]);
  }

  onClickImage = (idx: number) => {
    const profilePhoto = this.aupairDetail.profilePhoto || this.aupairDetail.profilePicture;
    this.previewPictures = [...profilePhoto ? [{ id: 0, src: profilePhoto, isSelected: idx === 0 }] : [],
    ...this.aupairDetail.otherPhotos.map((e: string, i: number) => {
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

  onClickFavoriteAupair = (user: any) => {
    // if (this.userDetail?.userType === UserTypeEnum.FAMILY) {
    const params = { favoriteId: this.aupairId };
    let apiEndpoint = user.favorite
      ? this.removeFavorite(params)
      : this.addFavorite(params);
    if (this.aupairFavoriteSubscriber$) {
      this.aupairFavoriteSubscriber$.unsubscribe();
    }
    this.aupairFavoriteSubscriber$ = apiEndpoint.subscribe({
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

}
