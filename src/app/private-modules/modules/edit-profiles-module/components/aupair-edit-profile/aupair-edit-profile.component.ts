import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators  } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { Observable, Subscription, forkJoin } from 'rxjs';
import moment, { Moment } from 'moment';
import { EditProfileService } from '../../services';
import {
  MY_MAT_DATE_PICKER_FORMATS,
  RouteConstant,
  StatusEnum,
  continentAndCountriesFamilyData,
  countryData,
  aupairCountryData,
  durationOfStayData,
  educationData,
  fromAupairAgeListData,
  genderListData,
  getCurrentDateWithFirstDateOfMonth,
  hostKidAgeGroupData,
  languageData,
  professionData,
  religionData,
  rematchMonthData,
  statusesData,
} from '@app/helpers';
import { FormBaseComponent } from '@app/utility/components';
import { CommonService, SharedService } from '@app/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-aupair-edit-profile',
  templateUrl: './aupair-edit-profile.component.html',
  styleUrls: ['./aupair-edit-profile.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_MAT_DATE_PICKER_FORMATS },
  ],
})
export class AupairEditProfileComponent extends FormBaseComponent {
  // Form variables
  aupairProfileForm!: FormGroup;
  isLoading = false;
  profilePhotos = [];
  otherPhotos: any[] = [];
  user: any;
  hostAgeList = hostKidAgeGroupData;
  genders = genderListData;
  fromAgeList = fromAupairAgeListData;
  languages = languageData;
  countries = countryData;
  aupairCountry =   aupairCountryData;
  religions = religionData;
  educationList = educationData;
  statusList = statusesData;
  continentAndCountries = continentAndCountriesFamilyData;
  rematchMonthList = rematchMonthData;
  minDate: Date = getCurrentDateWithFirstDateOfMonth();
  durationOfStayList = durationOfStayData;
  professionList = professionData;
  statusEnum = StatusEnum;
  isSubmitted: boolean = false;


  private getAupairProfileSubscription$!: Subscription;

  constructor(
    fb: FormBuilder,
    private commonService: CommonService,
    private sharedService: SharedService,
    private profileService: EditProfileService,
    private toastr: ToastrService,
    private translate: TranslateService,
    public router: Router
  ) {
    super(fb);
  }

  ngOnInit(): void {
    this.initialize();
    this.user = this.sharedService.getUser();
    if (this.user && this.user.userId) {
      this.bindAuPairProfile(this.user.userId);
    
    this.aupairProfileForm.controls['status'].valueChanges
    .pipe(
      debounceTime(100), // dalay after every change to update your validations
      distinctUntilChanged(), // only update validators when value change
      tap((value) => {
        // depend on your options you can use switch here
        if (value === StatusEnum.REMATCH) {
          this.aupairProfileForm.controls[
            'rematchMonthsLeft'
          ].setValidators([Validators.required]);
          this.aupairProfileForm.controls[
            'rematchMonthsLeft'
          ].updateValueAndValidity();
          this.aupairProfileForm.controls[
            'rematchCountry'
          ].setValidators([Validators.required]);
          this.aupairProfileForm.controls[
            'rematchCountry'
          ].updateValueAndValidity();
        } else {
          this.aupairProfileForm.controls[
            'rematchMonthsLeft'
          ].setValidators([]);
          this.aupairProfileForm.controls[
            'rematchMonthsLeft'
          ].updateValueAndValidity();
          this.aupairProfileForm.controls[
            'rematchCountry'
          ].setValidators([]);
          this.aupairProfileForm.controls[
            'rematchCountry'
          ].updateValueAndValidity();
        }
      })
    )
    .subscribe();
}
  }

  initialize = () => {
    this.createAupairProfileForm();
  };

  createAupairProfileForm = () => {
    this.aupairProfileForm = this.createForm({
      // id: [''],
      email: ['', []],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      age: [, [Validators.required]],
      listLanguageIds: ['', []],
      presentCity: ['', [Validators.required]],
      presentCountry: ['', [Validators.required]],
      citizenOf: ['', [Validators.required]],
      religion: [, []],
      profession: [, []],
      canBike: [false, []],
      drivingLicence: [false, []],
      nonSmoker: [false, []],
      childCareExperience: [false, []],
      aupairExperience: [false, []],
      specialNeedPeople: [false, []],
      education: [, []],
      status: ['', [Validators.required]],
      aupairDescription: [
        '',
        [Validators.required, minCharactersValidator],
      ],
      letterToHost: ['', []],
      experience: ['', []],
      listFamilyCountries: ['', []],
      listHostKidsAge: ['', []],
      availableFrom: ['', []],
      durationOfStay: ['', []],
      rematchMonthsLeft: ['', []],
      rematchCountry: ['', []],
    });
  };

  get f() {
    return this.aupairProfileForm.controls;
  }
  handlePageRelatedData = (res: any) => {
    this.handleProfileDataResponse(res[0]);
    this.handleProfilePhotoResponse(res[1]);
    this.handleProfileOtherPhotoResponse(res[2]);
    this.isLoading = false;
  };

  bindAuPairProfile = (userId: string) => {
    this.isLoading = true;
    const observables: Observable<any>[] = [
      this.profileService.getAupairProfile(),
      this.commonService.getPhotos({ PhotoType: 1 }),
      this.commonService.getPhotos({ PhotoType: 2 }),
    ];
    if (this.getAupairProfileSubscription$) {
      this.getAupairProfileSubscription$.unsubscribe();
    }
    this.getAupairProfileSubscription$ = forkJoin(observables).subscribe({
      next: (res) => this.handlePageRelatedData(res),
      error: (e) => console.error(e),
    });
  };

  updateAupairProfileForm = (user: any) => {
    const {
      firstName,
      lastName,
      email,
      gender,
      age,
      presentCity,
      presentCountry,
      citizenOf,
      profession,
      education,
      religion,
      durationOfStay,
      availableFrom,
      canBike,
      drivingLicence,
      nonSmoker,
      specialNeedPeople,
      aupairExperience,
      childCareExperience,
      aupairDescription,
      letterToHost,
      experience,
      status,
      rematchMonthsLeft,
      rematchCountry,
      listLanguageIds,
      listFamilyCountries,
      listHostKidsAge,
    } = user;
    this.aupairProfileForm.patchValue({
      email,
      firstName,
      lastName,
      gender,
      age,
      presentCity,
      presentCountry,
      citizenOf,
      religion,
      profession,
      education,
      status,
      aupairDescription,
      letterToHost,
      experience,
      availableFrom: moment.utc(availableFrom),
      durationOfStay,
      rematchMonthsLeft,
      rematchCountry,
      canBike,
      drivingLicence,
      nonSmoker,
      specialNeedPeople,
      aupairExperience,
      childCareExperience,
      listLanguageIds: listLanguageIds.split(','),
      listFamilyCountries: listFamilyCountries
        .split(',')
        .map((e: string) => +e),
      listHostKidsAge: listHostKidsAge.split(','),
    });
  };

  handleProfileDataResponse = (response: any) => {
    const user = response.payload;
    this.updateAupairProfileForm(user);
  };

  handleProfilePhotoResponse = (response: any) => {
    this.profilePhotos = response.payload || [];
  };

  handleProfileOtherPhotoResponse = (response: any) => {
    this.otherPhotos = response.payload || [];
  };

  handleUpdateAupairProfileResponse = (res: any) => {
    // alert(res.message);
  };

  onAupairEditProfileSubmit = (form: FormGroup) => {
    this.isSubmitted = true;
    if (this.aupairProfileForm.invalid) {
     // return;
    }
      const params = { ...form.value };
      params.listLanguageIds = params.listLanguageIds.join(',');
      params.listFamilyCountries = params.listFamilyCountries.join(',');
      params.listHostKidsAge = params.listHostKidsAge.join(',');
      params.availableFrom = params.availableFrom.toISOString();
      if (params.status != StatusEnum.REMATCH) {
        delete params.rematchCountry;
        delete params.rematchMonthsLeft;
      }
      this.profileService.updateAupairProfile(params).subscribe({
        next: (res) => {
          this.handleUpdateAupairProfileResponse(res);
          this.ShowMessage();
        },
        error: (e) => {},
      });
 
  };

 
  ShowMessage() {
    this.toastr.success(this.translate.instant('DIALOG_BOX.PROFILE_CREATED'),'Success', {
      timeOut: 2000,
      positionClass: 'toast-bottom-center',
    });
  }
  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const { availableFrom } = this.aupairProfileForm.value;
    availableFrom.month(normalizedMonthAndYear.month());
    availableFrom.year(normalizedMonthAndYear.year());
    this.aupairProfileForm.patchValue({ availableFrom });
    datepicker.close();
  }

  onCancel = () => {
    this.router.navigate([`/${RouteConstant.AUPAIR_VIEW_PROFILE_ROUTE}`]);
  }
  
  get formControls() {
    return this.aupairProfileForm.controls;
  }
}
export function minCharactersValidator(minChars: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value && control.value.length < minChars) {
      return { 'minCharacters': { requiredLength: minChars, actualLength: control.value.length } };
    }
    return null;
  };
}