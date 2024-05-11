import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilySearchFilterComponent } from './family-search-filter.component';

describe('FamilySearchFilterComponent', () => {
  let component: FamilySearchFilterComponent;
  let fixture: ComponentFixture<FamilySearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilySearchFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilySearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
