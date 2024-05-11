import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRightPartComponent } from './auth-right-part.component';

describe('AuthRightPartComponent', () => {
  let component: AuthRightPartComponent;
  let fixture: ComponentFixture<AuthRightPartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthRightPartComponent]
    });
    fixture = TestBed.createComponent(AuthRightPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
