import { Component, OnInit } from '@angular/core';
import { SharedService } from '@app/core';
import { UserTypeEnum } from '@app/helpers';
import { SignalRService } from '@app/private-modules/modules/chat-module/services/SignalR.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent implements OnInit {
  userDetailSub$!: Subscription;
  userDetail: any;

  constructor(
    private sharedService: SharedService,
    private signalRService: SignalRService
  ) { }

  ngOnInit(): void {
    // this.signalRService.startConnection();
    this.userSubscriber();
  }

  userSubscriber = () => {
    this.userDetailSub$ = this.sharedService
      .getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedService.getUser();
      });
  };

  get isAupair(){
    return this.userDetail?.userType == UserTypeEnum.AU_PAIR
  }

  get isFamily(){
    return this.userDetail?.userType == UserTypeEnum.FAMILY
  }

}
