import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '@app/core';
import { UserTypeEnum } from '@app/helpers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-public-profile-container',
  templateUrl: './public-profile-container.component.html',
  styleUrls: ['./public-profile-container.component.scss']
})
export class PublicProfileContainerComponent implements OnInit, OnDestroy {
  userName!: string | null;
  userDetail: any;
  userTypeFlag = UserTypeEnum;
  isLoading = false;
  private getUserProfileSubscriber$!: Subscription;

  constructor(private commonService: CommonService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userName = this.activeRoute.snapshot.paramMap.get('userName');
    this.bindUserProfile();
  }

  ngOnDestroy() {
    if (this.getUserProfileSubscriber$) {
      this.getUserProfileSubscriber$.unsubscribe();
    }
  }

  bindUserProfile = () => {
    this.isLoading = true;
    if (this.getUserProfileSubscriber$) {
      this.getUserProfileSubscriber$.unsubscribe();
    }

    this.getUserProfileSubscriber$ = this.commonService.getUserByProfileNumber({ profileNumber: this.userName })
      .subscribe({
        next: (res) => {
          this.handleGetUserDetailResponse(res);
        },
        error: (e) => { },
      });
  };

  handleGetUserDetailResponse = (res: any) => {
    this.userDetail = res.payload;
    this.isLoading = false;
  };
}
