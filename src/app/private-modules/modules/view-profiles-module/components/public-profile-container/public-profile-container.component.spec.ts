import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProfileContainerComponent } from './public-profile-container.component';

describe('PublicProfileContainerComponent', () => {
  let component: PublicProfileContainerComponent;
  let fixture: ComponentFixture<PublicProfileContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicProfileContainerComponent]
    });
    fixture = TestBed.createComponent(PublicProfileContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
