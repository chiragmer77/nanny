import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '@app/core';
import {
  toAupairAgeListData,
  countryData,
  familyCountryData,
  aupairCountryData,
  continentAndCountriesAupairData,
  familyTypeData,
  familyEmailData,
  hostKidAgeGroupData,
  numberOfChildrenData,
  fromAupairAgeListData,
  durationOfStayData,
  MY_MAT_DATE_PICKER_FORMATS,
  RouteConstant,
  getCurrentDateWithFirstDateOfMonth,
  familyStatusData,
  currencyData
} from '@app/helpers';
import { FormBaseComponent } from '@app/utility/components';
import { RegistrationService } from '../services';

@Component({
  selector: 'app-complete-family-registration',
  templateUrl: './complete-family-registration.component.html',
  styleUrls: ['./complete-family-registration.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_MAT_DATE_PICKER_FORMATS },
  ],
})
export class CompleteFamilyRegistrationComponent
  extends FormBaseComponent
  implements OnInit {
  // Form variables
  familyRegistrationForm!: FormGroup;
  user: any;
  countries = countryData;
  fromAgeList = fromAupairAgeListData;
  toAgeList = toAupairAgeListData;
  numberOfChildren = numberOfChildrenData;
  minDate: Date = getCurrentDateWithFirstDateOfMonth();
  hostAgeList = hostKidAgeGroupData;
  familyTypes = familyTypeData;
  familyEmails = familyEmailData;
  currency = currencyData;
  continentAndCountries = continentAndCountriesAupairData;
  familyCountry = familyCountryData;
  aupaircountries = aupairCountryData;
  durationOfStayList = durationOfStayData;
  //statusEnum = StatusEnum;
  statusList = familyStatusData;
  isProfileUpdated = false;
  isSubmitted: boolean = false;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private registrationService: RegistrationService,
    private sharedService: SharedService,
    private toastr: ToastrService,
  ) {
    super(fb);
  }

  ngOnInit(): void {
    // this.sharedService.handleRegisterResponse({
    //   "payload": {
    //     "user": {
    //       "userId": 65,
    //       "userType": "F",
    //       "email": "tarangsachdev+f1234@gmail.com"
    //     },
    //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhcmFuZ3NhY2hkZXYrZjEyMzRAZ21haWwuY29tIiwibmJmIjoxNjk4OTkzMTk5LCJleHAiOjE2OTk1OTc5OTksImlhdCI6MTY5ODk5MzE5OX0.aQGhMcQht9Odan48HDL6B8mVy3rW559V9Ei0K7xWByI"
    //   }
    // });
    this.user = this.sharedService.getUser();
    this.initialize();
  }

  initialize = () => {
    this.createFamilyRegistrationForm(this.user);
  };

  createFamilyRegistrationForm = (user: any) => {
    const { email, userId } = user;
    this.familyRegistrationForm = this.fb.group({
      id: [userId, []],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    //  email: [email || '', []],
      city: ['', []],
      country: ['', [Validators.required]],
      citizenOf: [0, []],
      noOfChildren: [1, []],
      familyType: [0, []],
      familyEmail: [1, []],
      pocketMoney:[null, []],
      pocketMoneyCurrency:[null, []],
      canBike: [false, []],
      drivingLicence: [false, []],
      nonSmoker: [false, []],
      childCareExperience: [false, []],
      aupairExperience: [false, []],
      specialNeedPeople: [false, []],
      phoneCode: ['', []],
      phoneNumber: ['', []],
      facebookURL: ['', []],
      presentCountry: ['', []],
      lookingFrom: [moment(), []],
      aupairAgeFrom: [18, []],
      aupairAgeTo: [30, []],
      durationOfStay: [4, []],
      listCitizenOf: [[], []],
      listKidsAgeGroup: [[], []],
      listAupairCountry: [[], []],
      status: [1, [Validators.required]],
      agreeToTerms: [false, Validators.requiredTrue] ,
      agreeToEmail: [true,[]] 
    });
  };

  updateFamilyProfileFOrm = (user: any) => {
    const {
      firstName,
      lastName,
      id,
      city,
      country,
      phoneCode,
      phoneNumber,
      facebookURL,
      citizenOf,
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
    this.familyRegistrationForm.patchValue({
      firstName,
      lastName,
      id,
      city,
      country,
      phoneCode,
      phoneNumber,
      facebookURL,
      citizenOf,
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

  get f() {
    return this.familyRegistrationForm.controls;
  }

  handleRegisterFamilyResponse = (res: any) => {
    this.isProfileUpdated = true;
    let user = this.sharedService.getUser();
    user.name = this.familyRegistrationForm.controls['firstName'].value + ' ' +this.familyRegistrationForm.controls['lastName'].value;
    this.sharedService.setUser(user);
  };

  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const { lookingFrom } = this.familyRegistrationForm.value;
    lookingFrom.month(normalizedMonthAndYear.month());
    lookingFrom.year(normalizedMonthAndYear.year());
    this.familyRegistrationForm.patchValue({ lookingFrom });
    datepicker.close();
  }

  onFamilyRegistrationSubmitRemoved = (form: FormGroup) => {
    this.isSubmitted = true;
    if (this.familyRegistrationForm.invalid) {
      console.log(this.familyRegistrationForm);
      //return;
    }
      const params = { ...form.getRawValue() };
      params.listCitizenOf = params.listCitizenOf.join(',');
      params.listAupairCountry = params.listAupairCountry.join(',');
      params.listKidsAgeGroup = params.listKidsAgeGroup.join(',');
      params.lookingFrom = params.lookingFrom.toISOString();
      this.registrationService.createFamily(params).subscribe({
        next: (res) => {
          this.handleRegisterFamilyResponse(res);
        },
        error: (e) => { },
      });
    
  };

  onFamilyRegistrationProfileSubmit = (form: FormGroup) => {
    this.isSubmitted = true;
    if (this.familyRegistrationForm.invalid) {
      this.ShowValidationMessage() ;
      return;
    }
      const params = { ...form.value };
      params.listCitizenOf = params.listCitizenOf.join(',');
      params.listAupairCountry = params.listAupairCountry.join(',');
      params.listKidsAgeGroup = params.listKidsAgeGroup.join(',');
      params.lookingFrom = params.lookingFrom.toISOString();
      this.registrationService.updateFamilyProfile(params).subscribe({
        next: (res) => {
          this.handleRegisterFamilyResponse(res);
        },
        error: (e) => { },
      });
    
  };

  ShowValidationMessage() {
    this.toastr.info('', 'Some fields missing', {
      timeOut: 1500,
      positionClass: 'toast-bottom-center',
    });
  }

  get formControls() {
    return this.familyRegistrationForm.controls;
  }

  navigateToHome(){
    this.router.navigate(['/']);
  }
}
