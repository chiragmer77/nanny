import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RematchFilterComponent } from './rematch-search-filter.component';

describe('AupairSearchFilterComponent', () => {
  let component: RematchFilterComponent;
  let fixture: ComponentFixture<RematchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RematchFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RematchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
