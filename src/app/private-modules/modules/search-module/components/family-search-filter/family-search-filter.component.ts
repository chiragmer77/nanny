import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscription, forkJoin } from 'rxjs';
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
  continentAndCountriesFamilyData,
  getCurrentDateWithFirstDateOfMonth,
  getUserIndex,
  numberOfChildrenUpToData,
  removeBlankValue,
} from '@app/helpers';

import { FormBaseComponent } from '@app/utility/components';
import { SearchService } from '../../services';
import { MatDialog } from '@angular/material/dialog';
import { FamilyViewProfileComponent } from '@app/private-modules/modules/view-profiles-module/components';

@Component({
  selector: 'app-family-search-filter',
  templateUrl: './family-search-filter.component.html',
  styleUrls: ['./family-search-filter.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_MAT_DATE_PICKER_FORMATS },
  ],
})
export class FamilySearchFilterComponent
  extends FormBaseComponent
  implements OnInit {
  // Form variables
  familyFilterForm!: FormGroup;
  continentAndCountries = continentAndCountriesFamilyData;
  numberOfChildrenUpTo = numberOfChildrenUpToData;
  isSearchLoading = true;
  familyUserViewProfileDialogRef!: any;
  familyList: any[] = [];
  isLoading = false;
  criteriaObj: any;
  minDate: Date = getCurrentDateWithFirstDateOfMonth();
  isFilterApplied = false;
  isFavoriteFilterApplied = false;
  private pageRelatedSubscriber$!: Subscription;
  private searchFamilyFilter$!: Subscription;

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
    if (this.searchFamilyFilter$) {
      this.searchFamilyFilter$.unsubscribe();
    }
  }

  initialize = () => {
    this.createFamilyFilterForm();
  };

  setDefaultFilters = (criteriaObj: any) => {
    const { countries = '', availableFrom, noOfChildren } = criteriaObj;

    let availableFromCopyObj = availableFrom;
    const criteriaAvailableFromDateObj = new Date(availableFrom);
    const currentFromDateObj = new Date();

    const criteriaAvailableFromYear =
      criteriaAvailableFromDateObj.getFullYear();
    const criteriaAvailableFromMonth = criteriaAvailableFromDateObj.getMonth();
    const currentFromYear = currentFromDateObj.getFullYear();
    const currentFromMonth = currentFromDateObj.getMonth();

    if (criteriaAvailableFromYear < currentFromYear) {
      availableFromCopyObj = getCurrentDateWithFirstDateOfMonth();
    } else if (criteriaAvailableFromYear == currentFromYear) {
      if (criteriaAvailableFromMonth < currentFromMonth) {
        availableFromCopyObj = getCurrentDateWithFirstDateOfMonth();
      }
    }

    this.familyFilterForm.patchValue({
      numberOfChildren: noOfChildren,
      countries: countries?.split(',').map((e: string) => +e),
      availableFrom: moment(availableFromCopyObj),
    });
    setTimeout(() => {
      this.onFamilyFilterFormSubmit(this.familyFilterForm, true);
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
    // this.isLoading = false;
  };

  bindPageRelatedData = () => {
    this.isLoading = true;
    const observables: Observable<any>[] = [
      this.searchService.getDefaultSearchCriteriaOfAupair(),
    ];
    if (this.pageRelatedSubscriber$) {
      this.pageRelatedSubscriber$.unsubscribe();
    }
    this.pageRelatedSubscriber$ = forkJoin(observables).subscribe({
      next: (res) => this.handlePageRelatedData(res),
      error: (e) => {
        this.isLoading = false;
      },
    });
  };

  createFamilyFilterForm = () => {
    this.familyFilterForm = this.fb.group({
      countries: [[], []],
      numberOfChildren: ['', []],
      availableFrom: [, []],
    });
  };

  onFamilyFilterFormSubmit = (form: FormGroup, isDefault = false) => {
    let params = { ...form.value };
    if (this.onSubmit(form)) {
      params.countries = params.countries.join(',');
      params.availableFrom = params.availableFrom.toISOString();
      params = removeBlankValue(params);
      this.isSearchLoading = true;
      if (this.searchFamilyFilter$) {
        this.searchFamilyFilter$.unsubscribe();
      }
      this.searchFamilyFilter$ = this.searchService
        .searchFamilies(params)
        .subscribe({
          next: (res) => {
            this.handleFamilySearchFilter(res);
            this.isFilterApplied = isDefault ? false : true;
            this.isFavoriteFilterApplied = false;
          },
          error: (e) => {
            this.isSearchLoading = false;
          },
        });
    }
  };

  handleFamilySearchFilter = (res: any) => {
    this.isSearchLoading = false;
    this.familyList = res.payload;
    // console.log(res);
  };

  onClickFavoriteFamilyFilter = () => {
    if (!this.isFavoriteFilterApplied) {
      if (this.searchFamilyFilter$) {
        this.searchFamilyFilter$.unsubscribe();
      }
      this.searchFamilyFilter$ = this.searchService
        .getFavoriteFamily()
        .subscribe({
          next: (res) => {
            this.handleFamilySearchFilter(res);
            this.isFilterApplied = false;
            this.isFavoriteFilterApplied = true;
          },
          error: (e) => {
            this.isSearchLoading = false;
          },
        });
    } else {
      this.onFamilyFilterFormSubmit(this.familyFilterForm);
    }
  };

  onHandleRemoveFavorite = (event: any) => {
    const { user } = event;
    if (this.isFavoriteFilterApplied) {
      this.familyList = this.familyList.filter((e) => e.id != user.id);
    }
  };

  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const { availableFrom } = this.familyFilterForm.value;
    availableFrom.month(normalizedMonthAndYear.month());
    availableFrom.year(normalizedMonthAndYear.year());
    this.familyFilterForm.patchValue({ availableFrom });
    datepicker.close();
  }

  onClickUserItem(event: any) {
    let { user } = event;

    this.familyUserViewProfileDialogRef = this.dialog.open(
      FamilyViewProfileComponent,
      {
        panelClass: [
          'animate__animated',
          'animate__slideInRight',
          'view-profile-right-dialog',
        ],
      }
    );

    this.familyUserViewProfileDialogRef.componentInstance.familyId = user.id;

    //if (user.id === 0) {
      this.familyUserViewProfileDialogRef.componentInstance.profileNumber =
        user.profileNumber;
    //}

    this.familyUserViewProfileDialogRef.componentInstance.close.subscribe(
      (e: any) => {
        this.familyUserViewProfileDialogRef.close();
      }
    );

    this.familyUserViewProfileDialogRef.componentInstance.nextClick.subscribe(
      (e: any) => {
        const userIdx = getUserIndex(this.familyList, user);

        if (userIdx >= this.familyList.length - 1) {
          return;
        }
        user = this.familyList[userIdx + 1];
        if (user) {
          this.onNextPreviousUser(user);
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
          this.onNextPreviousUser(user);
        }
      }
    );

    this.familyUserViewProfileDialogRef
      .afterClosed()
      .subscribe((result: any) => { });
  }

  onNextPreviousUser = (user: any) => {
    this.familyUserViewProfileDialogRef.componentInstance.familyId = user.id;
    if (user.id === 0) {
      this.familyUserViewProfileDialogRef.componentInstance.profileNumber =
        user.profileNumber;
    }
    this.familyUserViewProfileDialogRef.componentInstance.updateFamily();
  };

  get formControls() {
    return this.familyFilterForm.controls;
  }
}
