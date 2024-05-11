import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallNotificationDialogComponent } from './call-notification-dialog.component';

describe('CallNotificationDialogComponent', () => {
  let component: CallNotificationDialogComponent;
  let fixture: ComponentFixture<CallNotificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallNotificationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CallNotificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
