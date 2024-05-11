import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageViewSliderComponent } from './image-view-slider.component';

describe('ImageViewSliderComponent', () => {
  let component: ImageViewSliderComponent;
  let fixture: ComponentFixture<ImageViewSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageViewSliderComponent]
    });
    fixture = TestBed.createComponent(ImageViewSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
