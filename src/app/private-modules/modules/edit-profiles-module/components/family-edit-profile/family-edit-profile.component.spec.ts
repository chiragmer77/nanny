import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyEditProfileComponent } from './family-edit-profile.component';

describe('FamilyEditProfileComponent', () => {
  let component: FamilyEditProfileComponent;
  let fixture: ComponentFixture<FamilyEditProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FamilyEditProfileComponent]
    });
    fixture = TestBed.createComponent(FamilyEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
