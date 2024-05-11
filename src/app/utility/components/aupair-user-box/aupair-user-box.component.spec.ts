import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AupairUserBoxComponent } from './aupair-user-box.component';

describe('AupairUserBoxComponent', () => {
  let component: AupairUserBoxComponent;
  let fixture: ComponentFixture<AupairUserBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AupairUserBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AupairUserBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
