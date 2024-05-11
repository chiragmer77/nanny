import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Moment } from 'moment';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MY_MAT_DATE_PICKER_FORMATS,
  continentAndCountriesAupairData,
  aupairCountryData,
  fromAupairAgeListData,
  getCurrentDateWithFirstDateOfMonth,
  getUserIndex,
  removeBlankValue,
  toAupairAgeListData,
} from '@app/helpers';
import { FormBaseComponent } from '@app/utility/components';
import { SearchService } from '../../services';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AupairViewProfileComponent } from '@app/private-modules/modules/view-profiles-module/components';

@Component({
  selector: 'app-aupair-search-filter',
  templateUrl: './aupair-search-filter.component.html',
  styleUrls: ['./aupair-search-filter.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_MAT_DATE_PICKER_FORMATS },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AupairSearchFilterComponent
  extends FormBaseComponent
  implements OnInit {
  // Form variables
  aupairFilterForm!: FormGroup;
  continentAndCountries = continentAndCountriesAupairData;
  aupairUserViewProfileDialogRef!: any;
  countries = aupairCountryData;
  fromAgeList = fromAupairAgeListData;
  toAgeList = toAupairAgeListData;
  isLoading = false;
  isSearchLoading = false;
  minDate: Date = getCurrentDateWithFirstDateOfMonth();
  aupairList: any[] = [];
  criteriaObj: any;
  isFavoriteFilterApplied = false;
  isFilterApplied = false;
  private searchAupairFilter$!: Subscription;
  private pageRelatedSubscriber$!: Subscription;

  constructor(
    fb: FormBuilder,
    public dialog: MatDialog,
    private searchService: SearchService
  ) {
    super(fb);
  }

  ngOnInit(): void {
    this.initialize();
    this.bindPageRelatedData();
  }

  ngOnDestroy() {
    if (this.searchAupairFilter$) {
      this.searchAupairFilter$.unsubscribe();
    }
  }

  initialize = () => {
    this.createAupairFilterForm();
  };

  setDefaultFilters = (criteriaObj: any) => {
    const { citizenOf, countries, lookingFrom } = criteriaObj;

    let lookingFromCopyObj = lookingFrom;
    const criteriaLookingFromDateObj = new Date(lookingFrom);
    const currentFromDateObj = new Date();

    const criteriaLookingFromYear = criteriaLookingFromDateObj.getFullYear();
    const criteriaLookingFromMonth = criteriaLookingFromDateObj.getMonth();
    const currentFromYear = currentFromDateObj.getFullYear();
    const currentFromMonth = currentFromDateObj.getMonth();

    if (criteriaLookingFromYear < currentFromYear) {
      lookingFromCopyObj = getCurrentDateWithFirstDateOfMonth();
    } else if (criteriaLookingFromYear == currentFromYear) {
      if (criteriaLookingFromMonth < currentFromMonth) {
        lookingFromCopyObj = getCurrentDateWithFirstDateOfMonth();
      }
    }
    
    this.aupairFilterForm.patchValue({
      ageFrom: '',
      ageTo: '',
      citizenOf: citizenOf?.split(',').map((e: string) => +e),
      presentCountry: countries?.split(',').map((e: string) => +e),
      availableFrom: moment(lookingFromCopyObj),
    });

    setTimeout(() => {
      this.onAupairFilterFormSubmit(this.aupairFilterForm, true);
    }, 100);
  };

  handleDefaultSearchCriteriaFamily = (res: any) => {
    this.criteriaObj = res.payload[0] || {};
    this.setDefaultFilters(this.criteriaObj);
  };

  onClickClearAll = () => {
    this.setDefaultFilters(this.criteriaObj);
  };

  handlePageRelatedData = (res: any) => {
    this.handleDefaultSearchCriteriaFamily(res[0]);
  };

  bindPageRelatedData = () => {
    this.isLoading = true;
    const observables: Observable<any>[] = [
      this.searchService.getDefaultSearchCriteriaOfFamily(),
    ];
    if (this.pageRelatedSubscriber$) {
      this.pageRelatedSubscriber$.unsubscribe();
    }
    this.pageRelatedSubscriber$ = forkJoin(observables).subscribe({
      next: (res) => this.handlePageRelatedData(res),
      error: (e) => console.error(e),
    });
  };

  createAupairFilterForm = () => {
    this.aupairFilterForm = this.fb.group({
      presentCountry: [[], []],
      citizenOf: ['', []],
      ageFrom: ['', []],
      ageTo: ['', []],
      availableFrom: [, []],
    });
  };

  onAupairFilterFormSubmit = (form: FormGroup, isDefault = false) => {
    let params = { ...form.value };
    if (this.onSubmit(form)) {
      params.presentCountry = params.presentCountry.join(',');
      params.citizenOf = params.citizenOf.join(',');
      params.availableFrom = params.availableFrom.toISOString();
      params = removeBlankValue(params);
      this.isSearchLoading = true;
      if (this.searchAupairFilter$) {
        this.searchAupairFilter$.unsubscribe();
      }
      this.searchAupairFilter$ = this.searchService
        .searchAupairs(params)
        .subscribe({
          next: (res) => {
            this.handleAupairSearchFilter(res);
            this.isFilterApplied = isDefault ? false : true;
            this.isFavoriteFilterApplied = false;
          },
          error: (e) => { },
        });
    }
  };

  onClickFavoriteAupairFilter = () => {
    if (!this.isFavoriteFilterApplied) {
      if (this.searchAupairFilter$) {
        this.searchAupairFilter$.unsubscribe();
      }
      this.searchAupairFilter$ = this.searchService
        .getFavoriteAupair()
        .subscribe({
          next: (res) => {
            this.handleAupairSearchFilter(res);
            this.isFilterApplied = false;
            this.isFavoriteFilterApplied = true;
          },
          error: (e) => {
            this.isSearchLoading = false;
          },
        });
    } else {
      this.onAupairFilterFormSubmit(this.aupairFilterForm);
    }
  };

  onHandleRemoveFavorite = (event: any) => {
    const { user } = event;
    if (this.isFavoriteFilterApplied) {
      this.aupairList = this.aupairList.filter((e) => e.id != user.id);
    }
  };

  handleAupairSearchFilter = (res: any) => {
    this.isSearchLoading = false;
    this.aupairList = res.payload;
  };

  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const { availableFrom } = this.aupairFilterForm.value;
    availableFrom.month(normalizedMonthAndYear.month());
    availableFrom.year(normalizedMonthAndYear.year());
    this.aupairFilterForm.patchValue({ availableFrom });
    datepicker.close();
  }

  onClickUserItem(event: any) {
    let { user } = event;

    this.aupairUserViewProfileDialogRef = this.dialog.open(
      AupairViewProfileComponent,
      {
        panelClass: [
          'animate__animated',
          'animate__slideInRight',
          'view-profile-right-dialog',
        ],
      }
    );

    this.aupairUserViewProfileDialogRef.componentInstance.aupairId = user.id;
    if (user.id !== 0) {
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
        const userIdx = getUserIndex(this.aupairList, user);
        if (userIdx >= this.aupairList.length - 1) {
          return;
        }
        user = this.aupairList[userIdx + 1];
        if (user) {
          this.onNextPreviousUser(user);
        }
      }
    );

    this.aupairUserViewProfileDialogRef.componentInstance.previousClick.subscribe(
      (e: any) => {
        const userIdx = getUserIndex(this.aupairList, user);
        if (userIdx === 0) {
          return;
        }
        user = this.aupairList[userIdx - 1];
        if (user) {
          this.onNextPreviousUser(user);
        }
      }
    );

    this.aupairUserViewProfileDialogRef
      .afterClosed()
      .subscribe((result: any) => { });
  }

  onNextPreviousUser = (user: any) => {
    this.aupairUserViewProfileDialogRef.componentInstance.aupairId = user.id;
    if (user.id !== 0) {
      this.aupairUserViewProfileDialogRef.componentInstance.profileNumber =
        user.profileNumber;
    }
    this.aupairUserViewProfileDialogRef.componentInstance.updateAupair();
  };

  get formControls() {
    return this.aupairFilterForm.controls;
  }
}
