import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AupairViewProfileComponent } from './aupair-view-profile.component';

describe('AupairViewProfileComponent', () => {
  let component: AupairViewProfileComponent;
  let fixture: ComponentFixture<AupairViewProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AupairViewProfileComponent]
    });
    fixture = TestBed.createComponent(AupairViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
