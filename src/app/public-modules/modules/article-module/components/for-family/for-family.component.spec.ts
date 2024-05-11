import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForFamilyComponent } from './for-family.component';

describe('ForFamilyComponent', () => {
  let component: ForFamilyComponent;
  let fixture: ComponentFixture<ForFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForFamilyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
