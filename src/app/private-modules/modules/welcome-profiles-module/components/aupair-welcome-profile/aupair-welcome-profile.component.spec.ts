import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AupairWelcomeProfileComponent } from './aupair-welcome-profile.component';

describe('AupairWelcomeProfileComponent', () => {
  let component: AupairWelcomeProfileComponent;
  let fixture: ComponentFixture<AupairWelcomeProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AupairWelcomeProfileComponent]
    });
    fixture = TestBed.createComponent(AupairWelcomeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
