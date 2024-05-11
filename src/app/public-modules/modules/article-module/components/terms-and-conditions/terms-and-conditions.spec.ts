import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTermsComponent } from './terms-and-conditions.component';

describe('ArticleTermsComponent', () => {
  let component: ArticleTermsComponent;
  let fixture: ComponentFixture<ArticleTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleTermsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
