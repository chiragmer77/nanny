import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
import * as moment from 'moment';
import { Moment } from 'moment';
import { SharedService } from '@app/core';
import {
  MY_MAT_DATE_PICKER_FORMATS,
  countryData,
  aupairCountryData,
  durationOfStayData,
  educationData,
  fromAupairAgeListData,
  genderListData,
  hostKidAgeGroupData,
  languageData,
  religionData,
  rematchMonthData,
  statusesData,
  professionData,
  continentAndCountriesFamilyData,
  StatusEnum,
  getCurrentDateWithFirstDateOfMonth,
} from '@app/helpers';
import { FormBaseComponent } from '@app/utility/components';
import { RegistrationService } from '../services';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
@Component({
  selector: 'app-complete-aupair-registration',
  templateUrl: './complete-aupair-registration.component.html',
  styleUrls: ['./complete-aupair-registration.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_MAT_DATE_PICKER_FORMATS },
  ],
})
export class CompleteAupairRegistrationComponent
  extends FormBaseComponent
  implements OnInit
{
  // Form variables
  aupairRegistrationForm!: FormGroup;
  hostAgeList = hostKidAgeGroupData;
  genders = genderListData;
  fromAgeList = fromAupairAgeListData;
  languages = languageData;
  countries = countryData;
  aupairCountry =   aupairCountryData;
  religions = religionData;
  educationList = educationData;
  statusList = statusesData;
  minDate: Date = getCurrentDateWithFirstDateOfMonth();
  continentAndCountries = continentAndCountriesFamilyData;
  rematchMonthList = rematchMonthData;
  durationOfStayList = durationOfStayData;
  user: any;
  statusEnum = StatusEnum;
  isSubmitted: boolean = false;
  professionList = professionData;
  isProfileUpdated = false;

  constructor(
    fb: FormBuilder,
    private registrationService: RegistrationService,
    private sharedService: SharedService
  ) {
    super(fb);
  }

  ngOnInit(): void {
    this.user = this.sharedService.getUser();
    this.initialize();
    this.aupairRegistrationForm.controls['status'].valueChanges
      .pipe(
        debounceTime(100), // dalay after every change to update your validations
        distinctUntilChanged(), // only update validators when value change
        tap((value) => {
          // depend on your options you can use switch here
          if (value === StatusEnum.REMATCH) {
            this.aupairRegistrationForm.controls[
              'rematchMonthsLeft'
            ].setValidators([Validators.required]);
            this.aupairRegistrationForm.controls[
              'rematchMonthsLeft'
            ].updateValueAndValidity();
            this.aupairRegistrationForm.controls[
              'rematchCountry'
            ].setValidators([Validators.required]);
            this.aupairRegistrationForm.controls[
              'rematchCountry'
            ].updateValueAndValidity();
          } else {
            this.aupairRegistrationForm.controls[
              'rematchMonthsLeft'
            ].setValidators([]);
            this.aupairRegistrationForm.controls[
              'rematchMonthsLeft'
            ].updateValueAndValidity();
            this.aupairRegistrationForm.controls[
              'rematchCountry'
            ].setValidators([]);
            this.aupairRegistrationForm.controls[
              'rematchCountry'
            ].updateValueAndValidity();
          }
        })
      )
      .subscribe();
  }

  initialize = () => {
    this.createAupairRegistrationForm(this.user);
  };

  createAupairRegistrationForm = (user: any = {}) => {
    const { email, userId } = user;
    this.aupairRegistrationForm = this.createForm({
      id: [userId, []],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
     // email: [email || '', []],
      gender: ['', [Validators.required]],
      age: [, [Validators.required]],
      listLanguageIds: [[], []],
      presentCity: ['', [Validators.required]],
      presentCountry: ['', [Validators.required]],
      citizenOf: ['', [Validators.required]],
      religion: [, []],
      profession: [, []],
      education: [, []],
      status: [1, [Validators.required]],
      agreeToTerms: [false, Validators.requiredTrue] ,
      agreeToEmail: [true] ,      
      canBike: [false, []],
      drivingLicence: [false, []],
      nonSmoker: [false, []],
      childCareExperience: [false, []],
      aupairExperience: [false, []],
      specialNeedPeople: [false, []],
      listFamilyCountries: [[], []],
      listHostKidsAge: [[], []],
      availableFrom: [moment(), []],
      durationOfStay: [4, []],
      rematchMonthsLeft: ['', []],
      rematchCountry: ['', []],
    });
  };
  get f() {
    return this.aupairRegistrationForm.controls;
  }


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
      status,
      rematchMonthsLeft,
      rematchCountry,
      listLanguageIds,
      listFamilyCountries,
      listHostKidsAge,
    } = user;
    this.aupairRegistrationForm.patchValue({
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





  handleRegisterAupairResponse = (res: any) => {
    this.isProfileUpdated = true;
    let user = this.sharedService.getUser();
    user.name = this.aupairRegistrationForm.controls['firstName'].value;
    this.sharedService.setUser(user);
  };

  //onAupairRegistrationSubmit = (form: FormGroup) => {
  //  this.isSubmitted = true;
   // console.log('hello');
   // if (this.aupairRegistrationForm.invalid) {
   //   return;
   // }
   // const params = { ...form.getRawValue() };
   // params.listLanguageIds = params.listLanguageIds.join(',');
   // params.listFamilyCountries = params.listFamilyCountries.join(',');
   // params.listHostKidsAge = params.listHostKidsAge.join(',');
   // params.availableFrom = params.availableFrom.toISOString();
   // if (params.status != StatusEnum.REMATCH) {
   //   delete params.rematchCountry;
    //  delete params.rematchMonthsLeft;
   // }
   // this.registrationService.createAupair(params).subscribe({
   //   next: (res) => {
  //      this.handleRegisterAupairResponse(res);
  //    },
  //    error: (e) => {},
  //  });
 // };


  onAupairEditProfileSubmit = (form: FormGroup) => {
    this.isSubmitted = true;
    if (this.aupairRegistrationForm.invalid) {
      return;
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
      this.registrationService.updateAupairProfile(params).subscribe({
        next: (res) => {
        this.handleRegisterAupairResponse(res);

        //  this.handleUpdateAupairProfileResponse(res);
          //this.ShowMessage();
        },
        error: (e) => {},
      });
 
  };




  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const { availableFrom } = this.aupairRegistrationForm.value;
    availableFrom.month(normalizedMonthAndYear.month());
    availableFrom.year(normalizedMonthAndYear.year());
    this.aupairRegistrationForm.patchValue({ availableFrom });
    datepicker.close();
  }

  get formControls() {
    return this.aupairRegistrationForm.controls;
  }
}

