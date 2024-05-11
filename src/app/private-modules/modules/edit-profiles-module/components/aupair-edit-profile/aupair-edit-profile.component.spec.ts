import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AupairEditProfileComponent } from './aupair-edit-profile.component';

describe('AupairEditProfileComponent', () => {
  let component: AupairEditProfileComponent;
  let fixture: ComponentFixture<AupairEditProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AupairEditProfileComponent]
    });
    fixture = TestBed.createComponent(AupairEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
