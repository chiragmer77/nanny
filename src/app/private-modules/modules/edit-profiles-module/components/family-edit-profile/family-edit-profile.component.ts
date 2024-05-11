import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  MY_MAT_DATE_PICKER_FORMATS,
  RouteConstant,
  continentAndCountriesAupairData,
  familyCountryData,
  aupairCountryData,
  durationOfStayData,
  familyTypeData,
  fromAupairAgeListData,
  getCurrentDateWithFirstDateOfMonth,
  hostKidAgeGroupData,
  numberOfChildrenData,
  toAupairAgeListData,
  familyStatusData,
  familyEmailData,
  currencyData
} from '@app/helpers';
import { FormBaseComponent } from '@app/utility/components';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { EditProfileService } from '../../services';
import { CommonService, SharedService } from '@app/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import moment, { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-family-edit-profile',
  templateUrl: './family-edit-profile.component.html',
  styleUrls: ['./family-edit-profile.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_MAT_DATE_PICKER_FORMATS },
  ],
})
export class FamilyEditProfileComponent extends FormBaseComponent {
  // Form variables
  isLoading = false;
  familyProfileForm!: FormGroup;
  user: any;
  aupaircountries = aupairCountryData;
  fromAgeList = fromAupairAgeListData;
  toAgeList = toAupairAgeListData;
  numberOfChildren = numberOfChildrenData;
  hostAgeList = hostKidAgeGroupData;
  profilePhotos: any[] = [];
  otherPhotos: any[] = [];
  familyTypes = familyTypeData;
  familyEmails = familyEmailData;
  currency = currencyData;
  minDate: Date = getCurrentDateWithFirstDateOfMonth();
  continentAndCountries = continentAndCountriesAupairData;
  familyCountry = familyCountryData;
  durationOfStayList = durationOfStayData;
  statusList = familyStatusData;
  isSubmitted: boolean = false;

  private getFamilyProfileSubscription$!: Subscription;

  constructor(
    fb: FormBuilder,
    private sharedService: SharedService,
    private profileService: EditProfileService,
    private commonService: CommonService,
    private toastr: ToastrService,
    private translate: TranslateService,
    public router: Router
  ) {
    super(fb);
  }

  ngOnInit(): void {
    this.initialize();
    this.user = this.sharedService.getUser();
    console.log("this.user", this.user)
    if (this.user && this.user.userId) {
      this.bindFamilyProfile();
    }
  }

  initialize = () => {
    this.createFamilyProfileForm();
  };

  createFamilyProfileForm = () => {
    this.familyProfileForm = this.fb.group({
      id: [''],
      email: ['', []],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      city: ['', []],
      country: ['', [Validators.required]],
      citizenOf: ['', []],
      noOfChildren: ['', []],
      listKidsAgeGroup: ['', []],
      familyType: ['', []],
      familyEmail: [1, []],
      pocketMoney: ['', []],
      pocketMoneyCurrency: [1, []],
      familyDescription: ['', []],
      jobDescription: ['', [Validators.required]],
      phoneCode: ['', []],
      canBike: [false, []],
      drivingLicence: [false, []],
      nonSmoker: [false, []],
      childCareExperience: [false, []],
      aupairExperience: [false, []],
      specialNeedPeople: [false, []],
      phoneNumber: ['', []],
      facebookURL: ['', []],
      listAupairCountry: ['', []],
      listCitizenOf: ['', []],
      lookingFrom: ['', []],
      aupairAgeFrom: ['', []],
      aupairAgeTo: ['', []],
      durationOfStay: ['', []],
      status: [1, [Validators.required]]
    });
  };

  get f() {
    return this.familyProfileForm.controls;
  }

  handleProfilePhotoResponse = (response: any) => {
    this.profilePhotos = response.payload || [];
  };

  handleProfileOtherPhotoResponse = (response: any) => {
    this.otherPhotos = response.payload || [];
  };

  handlePageRelatedData = (res: any) => {
    this.handleFamilyProfileData(res[0]);
    this.handleProfilePhotoResponse(res[1]);
    this.handleProfileOtherPhotoResponse(res[2]);
    this.isLoading = false;
  };

  bindFamilyProfile = () => {
    this.isLoading = true;
    const observables: Observable<any>[] = [
      this.profileService.getFamilyProfile(),
      this.commonService.getPhotos({ PhotoType: 1 }),
      this.commonService.getPhotos({ PhotoType: 2 }),
    ];
    if (this.getFamilyProfileSubscription$) {
      this.getFamilyProfileSubscription$.unsubscribe();
    }
    this.getFamilyProfileSubscription$ = forkJoin(observables).subscribe({
      next: (res) => this.handlePageRelatedData(res),
      error: (e) => console.error(e),
    });
  };

  updateFamilyProfileFOrm = (user: any) => {
    const {
      firstName,
      lastName,
      email,
      id,
      city,
      country,
      phoneCode,
      phoneNumber,
      facebookURL,
      citizenOf,
      familyDescription,
      jobDescription,
      familyType,
      familyEmail,
      pocketMoney,
      pocketMoneyCurrency,
      noOfChildren,
      lookingFrom,
      durationOfStay,
      aupairAgeFrom,
      aupairAgeTo,
      canBike,
      nonSmoker,
      drivingLicence,
      aupairExperience,
      specialNeedPeople,
      childCareExperience,
      status,
      listKidsAgeGroup,
      listAupairCountry,
      listCitizenOf,
    } = user;
    this.familyProfileForm.patchValue({
      firstName,
      lastName,
      id,
      email,
      city,
      country,
      phoneCode,
      phoneNumber,
      facebookURL,
      citizenOf,
      familyDescription,
      jobDescription,
      familyType,
      familyEmail,
      pocketMoney,
      pocketMoneyCurrency,
      noOfChildren,
      lookingFrom: moment.utc(lookingFrom),
      durationOfStay,
      aupairAgeFrom,
      aupairAgeTo,
      canBike,
      nonSmoker,
      aupairExperience,
      drivingLicence,
      specialNeedPeople,
      childCareExperience,
      status,
      listKidsAgeGroup: listKidsAgeGroup.split(','),
      listAupairCountry: listAupairCountry.split(',').map((e: string) => +e),
      listCitizenOf: listCitizenOf.split(',').map((e: string) => +e)
    });
  };

  handleFamilyProfileData = (response: any) => {
    const familyUserProfile = response.payload;
    this.isLoading = false;
    if (familyUserProfile?.profilePhoto) {
      this.profilePhotos = [familyUserProfile.profilePhoto];
    }
    if (familyUserProfile?.otherPhotos) {
      this.otherPhotos = familyUserProfile.otherPhotos;
    }
    this.updateFamilyProfileFOrm(familyUserProfile);
  };

  handleUpdateFamilyProfileResponse = (res: any) => {
    //alert(res.message);
  };

  onFamilyEditProfileSubmit = (form: FormGroup) => {
    this.isSubmitted = true;

    if (this.familyProfileForm.invalid) {
      this.ShowValidationMessage();
      return;
      //TODO
    }
    const params = { ...form.value };
    params.listCitizenOf = params.listCitizenOf.join(',');
    params.listAupairCountry = params.listAupairCountry.join(',');
    params.listKidsAgeGroup = params.listKidsAgeGroup.join(',');
    params.lookingFrom = params.lookingFrom.toISOString();
    this.profileService.updateFamilyProfile(params).subscribe({
      next: (res) => {
        this.handleUpdateFamilyProfileResponse(res);
        this.ShowMessage();
      },
      error: (e) => { },
    });

  };

  ShowValidationMessage() {
    this.toastr.info('', 'Please fill the required fields', {
      timeOut: 1000,
      positionClass: 'toast-bottom-center',
    });
  }

  ShowMessage() {
    this.toastr.success(this.translate.instant('DIALOG_BOX.PROFILE_CREATED'), 'Success', {
      timeOut: 1500,
      positionClass: 'toast-bottom-center',
    });
  }

  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const { lookingFrom } = this.familyProfileForm.value;
    lookingFrom.month(normalizedMonthAndYear.month());
    lookingFrom.year(normalizedMonthAndYear.year());
    this.familyProfileForm.patchValue({ lookingFrom });
    datepicker.close();
  }

  onFileUpload = (fileInput: any) => { };

  onDocumentClick = (event: any) => {
    event.target.value = '';
  };

  onCancel = () => {
    this.router.navigate([`/${RouteConstant.FAMILY_VIEW_PROFILE_ROUTE}`]);
  }

  onBrowseFile(id: string) {
    document.getElementById(id)?.click();
  }
}
export function minCharacterValidator(minChars: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value && control.value.length < minChars) {
      return { 'minCharacters': { requiredLength: minChars, actualLength: control.value.length } };
    }
    return null;
  };

}
