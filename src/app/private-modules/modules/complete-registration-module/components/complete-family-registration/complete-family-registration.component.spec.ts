import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteFamilyRegistrationComponent } from './complete-family-registration.component';

describe('CompleteFamilyRegistrationComponent', () => {
  let component: CompleteFamilyRegistrationComponent;
  let fixture: ComponentFixture<CompleteFamilyRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteFamilyRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteFamilyRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
