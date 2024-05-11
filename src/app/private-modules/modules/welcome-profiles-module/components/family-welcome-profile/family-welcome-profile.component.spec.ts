import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyWelcomeProfileComponent } from './family-welcome-profile.component';

describe('FamilyWelcomeProfileComponent', () => {
  let component: FamilyWelcomeProfileComponent;
  let fixture: ComponentFixture<FamilyWelcomeProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FamilyWelcomeProfileComponent]
    });
    fixture = TestBed.createComponent(FamilyWelcomeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
