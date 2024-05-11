import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyUserBoxComponent } from './family-user-box.component';

describe('FamilyUserBoxComponent', () => {
  let component: FamilyUserBoxComponent;
  let fixture: ComponentFixture<FamilyUserBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyUserBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyUserBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
