import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RouteConstant } from '@app/helpers/constants';
import { CommonService, SharedService, SnackBarService } from '@app/core';

import { Observable, Subscription } from 'rxjs';

import {
  hostKidAgeGroupData,
} from '@app/helpers';
@Component({
  selector: 'app-family-welcome-profile',
  templateUrl: './family-welcome-profile.component.html',
  styleUrls: ['./family-welcome-profile.component.scss'],
})
export class FamilyWelcomeProfileComponent implements OnInit {
  @Input() familyId: any;
  //  @Input() profileNumber!: string;
  // @Input() familyDetailFromParent!: any;
  // @Output() close = new EventEmitter();


  userDetail!: any;
  familyDetail: any;
  isLoading = false;
  messagedisappeared: boolean = true;

  pictureType: any;
  previewPictures: any[] = [];

  private getFamilyUserDetailSubscriber$!: Subscription;

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private snackBarService: SnackBarService,
    public router: Router
  ) { }

  ngOnInit() {
    this.userDetail = this.sharedService.getUser();
    this.bindFamilyDetail();

  }

  ngOnDestroy() {
    if (this.getFamilyUserDetailSubscriber$) {
      this.getFamilyUserDetailSubscriber$.unsubscribe();
    }

  }


  bindFamilyDetail = () => {
    this.isLoading = true;
    if (this.getFamilyUserDetailSubscriber$) {
      this.getFamilyUserDetailSubscriber$.unsubscribe();
    }
    let familyApi: Observable<any>;
    //if (this.familyId) {
    //  familyApi = this.commonService.getFamilyById({ Id: this.familyId });
    //} else {
    familyApi = this.commonService.getFamilyWelcomePage();
    // }

    this.getFamilyUserDetailSubscriber$ = familyApi.subscribe({
      next: (res) => {
        this.handleGetFamilyDetailResponse(res);
      },
      error: (e) => {
        this.isLoading = false;
      },
    });
  };

  get interviewUrl() {
    return `/${RouteConstant.AUPAIR_INTERVIEWQUESTIONS}`;
  }
  handleGetFamilyDetailResponse = (res: any) => {
    this.familyDetail = res.payload;
    console.log("this.familyDetail",this.familyDetail)
    setTimeout(() => {
      this.messagedisappeared = false;
      if(!this.familyDetail.jobDescriptionPresent) {
      this.familyDetail.jobDescriptionPresent = true;
      }
    }, 3000);
    this.isLoading = false;
  };

  getListKidsAgeGroup = (listKidsAgeGroup: string = '') => {
    let kidsAgeArr: any = listKidsAgeGroup?.split(',') || [];
    kidsAgeArr = kidsAgeArr.map((e: any) => {
      return hostKidAgeGroupData.find((h) => h.value === e)?.text;
    });
    return kidsAgeArr.join(',');
  };

  get searchUrl() {
    return `/${RouteConstant.SEARCH}`;
  }

  get chatUrl() {
    return `/${RouteConstant.CHAT}`;
  }

  onEditProfile = () => {
    this.router.navigate([`/${RouteConstant.FAMILY_EDIT_PROFILE_ROUTE}`]);
  };


  // onCloseDialog() {
  //   this.close.emit();
  // }




}
