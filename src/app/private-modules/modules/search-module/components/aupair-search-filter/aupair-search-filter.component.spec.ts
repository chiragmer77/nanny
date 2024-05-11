import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AupairSearchFilterComponent } from './aupair-search-filter.component';

describe('AupairSearchFilterComponent', () => {
  let component: AupairSearchFilterComponent;
  let fixture: ComponentFixture<AupairSearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AupairSearchFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AupairSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
