import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AupairCountryComponent } from './aupair-country.component';

describe('AupairCountryComponent', () => {
  let component: AupairCountryComponent;
  let fixture: ComponentFixture<AupairCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AupairCountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AupairCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
