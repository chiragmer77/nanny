import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService, SharedService } from "@app/core";
import { RouteConstant } from "@app/helpers/constants";
import { Subscription } from "rxjs";
import AOS from "aos";
import { TranslateService } from "@ngx-translate/core";
import { MatDialog } from "@angular/material/dialog";
import {
  AupairViewProfileComponent,
  FamilyViewProfileComponent,
} from "@app/private-modules/modules/view-profiles-module/components";
import { getUserIndex } from "@app/helpers";
import { SignalRService } from "@app/private-modules/modules/chat-module/services/SignalR.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  familyList: any[] = [];
  euAupairList: any[] = [];
  // aupairList: any[] = [];
  nonEuAupairList: any[] = [];
  familyUserViewProfileDialogRef!: any;
  aupairUserViewProfileDialogRef!: any;

  isLoading = false;
  private getUserProfileSubscriber$!: Subscription;

  constructor(
    public router: Router,
    public dialog: MatDialog,
    private commonService: CommonService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    AOS.init({ disable: "mobile" });

    this.bindPageRelatedData();

    // this.familyList = [
    //   {
    //     id: 59,
    //     firstName: 'Nibin',
    //     profileNumber: null,
    //     city: 'string',
    //     country: 1,
    //     durationOfStay: 4,
    //     lookingFrom: '2023-11-02T00:06:21.64',
    //     noOfChildren: 3,
    //     profilePhotoName: null,
    //     profilePhoto: '',
    //   },
    //   {
    //     id: 60,
    //     firstName: 'Nibin',
    //     profileNumber: null,
    //     city: 'string',
    //     country: 11,
    //     durationOfStay: 0,
    //     lookingFrom: '2023-11-02T00:26:55.559',
    //     noOfChildren: 0,
    //     profilePhotoName: null,
    //     profilePhoto: '',
    //   },
    //   {
    //     id: 63,
    //     firstName: 'string',
    //     profileNumber: 'string863',
    //     city: 'string',
    //     country: 0,
    //     durationOfStay: 0,
    //     lookingFrom: '2023-11-02T00:45:34.722',
    //     noOfChildren: 0,
    //     profilePhotoName: null,
    //     profilePhoto: '',
    //   },
    //   {
    //     id: 65,
    //     firstName: 'Test',
    //     profileNumber: 'Test722',
    //     city: 'Ahmedabad',
    //     country: 201,
    //     durationOfStay: 2,
    //     lookingFrom: '2023-11-03T10:22:39.396',
    //     noOfChildren: 2,
    //     profilePhotoName: null,
    //     profilePhoto: '',
    //   },
    //   {
    //     id: 68,
    //     firstName: 'string',
    //     profileNumber: 'string930',
    //     city: 'string',
    //     country: 0,
    //     durationOfStay: 0,
    //     lookingFrom: '2023-11-03T08:57:08.705',
    //     noOfChildren: 0,
    //     profilePhotoName: null,
    //     profilePhoto: '',
    //   },
    //   {
    //     id: 71,
    //     firstName: 'Tarang',
    //     profileNumber: null,
    //     city: 'Bhanvad, DevBhumi Dwarka',
    //     country: 200,
    //     durationOfStay: 4,
    //     lookingFrom: '2023-11-06T05:41:31.495',
    //     noOfChildren: 1,
    //     profilePhotoName: null,
    //     profilePhoto: '',
    //   },
    //   {
    //     id: 73,
    //     firstName: 'TH Tarang',
    //     profileNumber: 'TH Tar673',
    //     city: 'New York',
    //     country: 200,
    //     durationOfStay: 5,
    //     lookingFrom: '2023-11-06T05:57:02.687',
    //     noOfChildren: 1,
    //     profilePhotoName: null,
    //     profilePhoto: '',
    //   },
    //   {
    //     id: 74,
    //     firstName: 'Nibin',
    //     profileNumber: 'Nibin788',
    //     city: 'string',
    //     country: 0,
    //     durationOfStay: 0,
    //     lookingFrom: '2023-11-06T13:02:06.214',
    //     noOfChildren: 0,
    //     profilePhotoName: null,
    //     profilePhoto: '',
    //   },
    //   {
    //     id: 78,
    //     firstName: 'NibinFamily',
    //     profileNumber: 'string607',
    //     city: 'string',
    //     country: 0,
    //     durationOfStay: 0,
    //     lookingFrom: '2023-11-15T22:34:59.25',
    //     noOfChildren: 0,
    //     profilePhotoName: null,
    //     profilePhoto: '',
    //   },
    // ];

    // this.aupairList = [
    //   {
    //     id: 0,
    //     firstName: 'REWTY',
    //     profileNumber: null,
    //     gender: 0,
    //     age: 0,
    //     presentCity: 'string',
    //     presentCountry: 0,
    //     durationOfStay: 0,
    //     availableFrom: '2023-11-01T11:03:02.24',
    //     rematch: null,
    //     profilePhotoName: '',
    //     profilePhoto: '',
    //   },
    //   {
    //     id: 5,
    //     firstName: 'Nibin55',
    //     profileNumber: 'string',
    //     gender: 0,
    //     age: 0,
    //     presentCity: 'string',
    //     presentCountry: 0,
    //     durationOfStay: 0,
    //     availableFrom: '2023-11-15T19:04:26.514',
    //     rematch: null,
    //     profilePhotoName: '',
    //     profilePhoto:
    //       'https://nannyaupair.blob.core.windows.net/photos/5_51762?sv=2023-08-03&se=2023-11-17T10%3A14%3A00Z&sr=b&sp=r&sig=2WgmtKUKmQPQATsFdb8cksw%2F0ENZ1tEQyMBR8X82%2BAw%3D',
    //   },
    //   {
    //     id: 15,
    //     firstName: 'PPPPP',
    //     profileNumber: null,
    //     gender: 0,
    //     age: 0,
    //     presentCity: 'string',
    //     presentCountry: 0,
    //     durationOfStay: 0,
    //     availableFrom: '2023-11-01T11:10:10.102',
    //     rematch: null,
    //     profilePhotoName: '',
    //     profilePhoto: '',
    //   },
    //   {
    //     id: 47,
    //     firstName: 'KKKK',
    //     profileNumber: 'KKKK239',
    //     gender: 0,
    //     age: 0,
    //     presentCity: 'string',
    //     presentCountry: 0,
    //     durationOfStay: 0,
    //     availableFrom: '2023-11-01T11:22:46.628',
    //     rematch: null,
    //     profilePhotoName: '',
    //     profilePhoto: '',
    //   },
    //   {
    //     id: 58,
    //     firstName: 'string',
    //     profileNumber: 'string256',
    //     gender: 0,
    //     age: 0,
    //     presentCity: 'string',
    //     presentCountry: 0,
    //     durationOfStay: 0,
    //     availableFrom: '2023-11-01T23:30:35.091',
    //     rematch: null,
    //     profilePhotoName: '',
    //     profilePhoto: '',
    //   },
    //   {
    //     id: 62,
    //     firstName: 'nibin',
    //     profileNumber: null,
    //     gender: 0,
    //     age: 0,
    //     presentCity: 'string',
    //     presentCountry: 0,
    //     durationOfStay: 0,
    //     availableFrom: '2023-11-02T00:43:01.875',
    //     rematch: null,
    //     profilePhotoName: '',
    //     profilePhoto: '',
    //   },
    //   {
    //     id: 64,
    //     firstName: 'Tara',
    //     profileNumber: 'Tara853',
    //     gender: 1,
    //     age: 34,
    //     presentCity: 'Simla',
    //     presentCountry: 211,
    //     durationOfStay: 2,
    //     availableFrom: '2023-11-03T10:24:19.598',
    //     rematch: null,
    //     profilePhotoName: '',
    //     profilePhoto: '',
    //   },
    //   {
    //     id: 67,
    //     firstName: 'string',
    //     profileNumber: 'string917',
    //     gender: 0,
    //     age: 0,
    //     presentCity: 'string',
    //     presentCountry: 0,
    //     durationOfStay: 0,
    //     availableFrom: '2023-11-03T08:56:28.741',
    //     rematch: null,
    //     profilePhotoName: '',
    //     profilePhoto: '',
    //   },
    //   {
    //     id: 70,
    //     firstName: 'Tarang',
    //     profileNumber: 'Tarang818',
    //     gender: 1,
    //     age: 16,
    //     presentCity: 'New York',
    //     presentCountry: 402,
    //     durationOfStay: 4,
    //     availableFrom: '2023-11-05T09:51:48.882',
    //     rematch: null,
    //     profilePhotoName: '',
    //     profilePhoto: '',
    //   },
    //   {
    //     id: 75,
    //     firstName: 'Nibin',
    //     profileNumber: 'Nibin874',
    //     gender: 0,
    //     age: 0,
    //     presentCity: 'string',
    //     presentCountry: 0,
    //     durationOfStay: 0,
    //     availableFrom: '2023-11-07T15:23:48.034',
    //     rematch: null,
    //     profilePhotoName: '',
    //     profilePhoto: '',
    //   },
    //   {
    //     id: 76,
    //     firstName: 'Tarnag',
    //     profileNumber: null,
    //     gender: 3,
    //     age: 19,
    //     presentCity: 'Ahdabad ',
    //     presentCountry: 100,
    //     durationOfStay: 1,
    //     availableFrom: '2023-11-07T15:46:08.384',
    //     rematch: null,
    //     profilePhotoName: '',
    //     profilePhoto:
    //       'https://nannyaupair.blob.core.windows.net/photos/76_38036?sv=2023-08-03&se=2023-11-17T10%3A14%3A00Z&sr=b&sp=r&sig=TGrliZr2OQPM5SzFq5b6c9QyQRpCPaDZ6Qdp4SiVFVk%3D',
    //   },
    //   {
    //     id: 88,
    //     firstName: 'nibin',
    //     profileNumber: null,
    //     gender: 2,
    //     age: 17,
    //     presentCity: 'xcxzczxc sdfsd sdfdsf sdfdsf',
    //     presentCountry: 401,
    //     durationOfStay: 2,
    //     availableFrom: '2023-11-15T14:59:53.335',
    //     rematch: null,
    //     profilePhotoName: '',
    //     profilePhoto:
    //       'https://nannyaupair.blob.core.windows.net/photos/88_39058?sv=2023-08-03&se=2023-11-17T10%3A14%3A00Z&sr=b&sp=r&sig=lxRL4sql3pPYbP6hqBP9y5N%2B8mNfdZaOjKx23Dle9S4%3D',
    //   },
    //   {
    //     id: 89,
    //     firstName: 'Nibin ',
    //     profileNumber: null,
    //     gender: 2,
    //     age: 17,
    //     presentCity: 'DIEMEN',
    //     presentCountry: 401,
    //     durationOfStay: 2,
    //     availableFrom: '2024-01-15T15:31:36.27',
    //     rematch: null,
    //     profilePhotoName: '',
    //     profilePhoto: '',
    //   },
    // ];
  }

  ngOnDestroy() {
    if (this.getUserProfileSubscriber$) {
      this.getUserProfileSubscriber$.unsubscribe();
    }
  }

  bindPageRelatedData = () => {
    this.isLoading = true;
    if (this.getUserProfileSubscriber$) {
      this.getUserProfileSubscriber$.unsubscribe();
    }

    this.getUserProfileSubscriber$ = this.commonService
      .getHomePage()
      .subscribe({
        next: (res) => {
          this.handleHomePageRelateData(res);
        },
        error: (e) => { },
      });
  };

  handleHomePageRelateData = (res: any) => {
    const { euAupairResponse, familyResponse, nonEUAupairResponse } =
      res.payload;
    this.familyList = familyResponse;
    this.euAupairList = euAupairResponse;
    this.nonEuAupairList = nonEUAupairResponse;
    this.isLoading = false;
  };

  onClickFamilyUser(event: any) {
    let { user } = event;

    this.familyUserViewProfileDialogRef = this.dialog.open(
      FamilyViewProfileComponent,
      {
        panelClass: [
          "animate__animated",
          "animate__slideInRight",
          "view-profile-right-dialog",
        ],
      }
    );

    this.familyUserViewProfileDialogRef.componentInstance.familyId = user.id;

    if (user.id === 0) {
      this.familyUserViewProfileDialogRef.componentInstance.profileNumber =
        user.profileNumber;
    }

    this.familyUserViewProfileDialogRef.componentInstance.close.subscribe(
      (e: any) => {
        this.familyUserViewProfileDialogRef.close();
      }
    );

    this.familyUserViewProfileDialogRef.componentInstance.nextClick.subscribe(
      (e: any) => {
        const userIdx = getUserIndex(this.familyList, user);
        if (userIdx < 0 || userIdx >= this.familyList.length - 1) {
          return;
        }
        user = this.familyList[userIdx + 1];
        if (user) {
          this.onNextPreviousFamily(user);
        }
      }
    );

    this.familyUserViewProfileDialogRef.componentInstance.previousClick.subscribe(
      (e: any) => {
        const userIdx = getUserIndex(this.familyList, user);
        if (userIdx === 0) {
          return;
        }
        user = this.familyList[userIdx - 1];
        if (user) {
          this.onNextPreviousFamily(user);
        }
      }
    );

    this.familyUserViewProfileDialogRef
      .afterClosed()
      .subscribe((result: any) => { });
  }

  onNextPreviousFamily = (user: any) => {
    this.familyUserViewProfileDialogRef.componentInstance.familyId = user.id;
    if (user.id === 0) {
      this.familyUserViewProfileDialogRef.componentInstance.profileNumber =
        user.profileNumber;
    }
    this.familyUserViewProfileDialogRef.componentInstance.updateFamily();
  };

  onClickAupairUser(event: any, aupairList: any[] = []) {
    let { user } = event;

    this.aupairUserViewProfileDialogRef = this.dialog.open(
      AupairViewProfileComponent,
      {
        panelClass: [
          "animate__animated",
          "animate__slideInRight",
          "view-profile-right-dialog",
        ],
      }
    );

    this.aupairUserViewProfileDialogRef.componentInstance.aupairId = user.id;
    if (user.id === 0) {
      this.aupairUserViewProfileDialogRef.componentInstance.profileNumber =
        user.profileNumber;
    }

    this.aupairUserViewProfileDialogRef.componentInstance.close.subscribe(
      (e: any) => {
        this.aupairUserViewProfileDialogRef.close();
      }
    );

    this.aupairUserViewProfileDialogRef.componentInstance.nextClick.subscribe(
      (e: any) => {
        const userIdx = getUserIndex(aupairList, user);
        if (userIdx >= aupairList.length - 1) {
          return;
        }
        user = aupairList[userIdx + 1];
        if (user) {
          this.onNextPreviousAupair(user);
        }
      }
    );

    this.aupairUserViewProfileDialogRef.componentInstance.previousClick.subscribe(
      (e: any) => {
        const userIdx = getUserIndex(aupairList, user);
        if (userIdx === 0) {
          return;
        }
        user = aupairList[userIdx - 1];
        if (user) {
          this.onNextPreviousAupair(user);
        }
      }
    );

    this.aupairUserViewProfileDialogRef
      .afterClosed()
      .subscribe((result: any) => { });
  }

  onNextPreviousAupair = (user: any) => {
    this.aupairUserViewProfileDialogRef.componentInstance.aupairId = user.id;
    if (user.id === 0) {
      this.aupairUserViewProfileDialogRef.componentInstance.profileNumber =
        user.profileNumber;
    }
    this.aupairUserViewProfileDialogRef.componentInstance.updateAupair();
  };

  //page event
  onArticleDetailsInterview() {
    this.router.navigate([`/${RouteConstant.AUPAIR_INTERVIEWQUESTIONS}`]);
  }

  onArticleDetailsAvoidScam() {
    this.router.navigate([`/${RouteConstant.AUPAIR_AVOIDSCAMS}`]);
  }

  get aupairUrl() {
    return `/${RouteConstant.AUPAIR_WELCOME_PROFILE_ROUTE}`;
  }

  get familyUrl() {
    return `/${RouteConstant.FAMILY_WELCOME_PROFILE_ROUTE}`;
  }

  redirectPage(type: string) {
    const user = this.sharedService.getUser();
    if (user) {
      if (type === 'family' && user.userType === 'F') {
        this.router.navigate([`/${RouteConstant.FAMILY_WELCOME_PROFILE_ROUTE}`]);
      }
      if (type === 'aupair' && user.userType === 'A') {
        this.router.navigate([`/${RouteConstant.AUPAIR_WELCOME_PROFILE_ROUTE}`]);
      }
    } else {
      this.router.navigate([`/${RouteConstant.REGISTER_ROUTE}`]);
    }
  }
}
