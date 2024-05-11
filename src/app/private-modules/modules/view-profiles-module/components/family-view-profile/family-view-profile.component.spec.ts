import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyViewProfileComponent } from './family-view-profile.component';

describe('FamilyViewProfileComponent', () => {
  let component: FamilyViewProfileComponent;
  let fixture: ComponentFixture<FamilyViewProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FamilyViewProfileComponent]
    });
    fixture = TestBed.createComponent(FamilyViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
