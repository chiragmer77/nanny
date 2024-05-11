import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvoidScamsComponent } from './avoid-scams.component';

describe('AvoidScamsComponent', () => {
  let component: AvoidScamsComponent;
  let fixture: ComponentFixture<AvoidScamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvoidScamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvoidScamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
