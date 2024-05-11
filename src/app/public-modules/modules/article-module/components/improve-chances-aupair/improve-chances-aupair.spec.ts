import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImproveChancesAupairComponent } from './improve-chances-aupair.component';

describe('InterviewQuestionsComponent', () => {
  let component: ImproveChancesAupairComponent;
  let fixture: ComponentFixture<ImproveChancesAupairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImproveChancesAupairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImproveChancesAupairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
