import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteAupairRegistrationComponent } from './complete-aupair-registration.component';

describe('CompleteAupairRegistrationComponent', () => {
  let component: CompleteAupairRegistrationComponent;
  let fixture: ComponentFixture<CompleteAupairRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteAupairRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteAupairRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
