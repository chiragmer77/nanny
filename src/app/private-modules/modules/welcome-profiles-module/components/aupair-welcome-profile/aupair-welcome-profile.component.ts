import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService, SharedService } from '@app/core';
import {
  RouteConstant,
  UploadPhotoTypeEnum,

} from '@app/helpers';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-aupair-welcome-profile',
  templateUrl: './aupair-welcome-profile.component.html',
  styleUrls: ['./aupair-welcome-profile.component.scss'],
})

export class AupairWelcomeProfileComponent implements OnInit {
  @Input() aupairId!: any;
  @Input() profileNumber!: string;
  @Input() aupairDetailFromParent!: any;
  @Output() close = new EventEmitter();
  pictureType: any;
  aupairDetail: any;
  userDetail!: any;
  isLoading = false;
  previewPictures: any[] = [];
  uploadPhotoTypeEnum = UploadPhotoTypeEnum;
  private getAupairUserDetailSubscriber$!: Subscription;

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    public router: Router
  ) { }

  ngOnInit() {
    this.userDetail = this.sharedService.getUser();
    if (this.aupairDetailFromParent) {
      this.aupairDetail = { ...this.aupairDetailFromParent };
    } else {
      this.bindAupairDetail();
    }
  }

  ngOnDestroy() {
    if (this.getAupairUserDetailSubscriber$) {
      this.getAupairUserDetailSubscriber$.unsubscribe();
    }
  }

  bindAupairDetail = () => {
    if (this.getAupairUserDetailSubscriber$) {
      this.getAupairUserDetailSubscriber$.unsubscribe();
    }
    this.isLoading = true;

    let aupairApi: Observable<any>;

    if (this.aupairId) {
      aupairApi = this.commonService.getAupairById({ Id: this.aupairId });
    
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

  onCloseDialog() {
    this.close.emit();
  }




}
