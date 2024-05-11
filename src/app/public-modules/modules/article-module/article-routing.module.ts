import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailComponent, AvoidScamsComponent, ForFamilyComponent, ImproveChancesAupairComponent, InterviewQuestionsComponent } from './components';
import { ArticleTermsComponent } from './components';
import { AupairCountryComponent } from './components';
import { RouteConstant } from '@app/helpers/constants';

const routes: Routes = [
  {
    path: RouteConstant.ARTICLE_DETAIL,
    component: ArticleDetailComponent
  },
  {
    path: RouteConstant.TERMS_DETAIL,
    component: ArticleTermsComponent
  },
  {
    path: RouteConstant.AUPAIR_COUNTRY,
    component: AupairCountryComponent
  },
  {
    path: RouteConstant.AUPAIR_INTERVIEWQUESTIONS,
    component: InterviewQuestionsComponent
  },
  {
    path: RouteConstant.AUPAIR_AVOIDSCAMS,
    component: AvoidScamsComponent
  },
  {
    path: RouteConstant.AUPAIR_IMPROVE_CHANCES,
    component: ImproveChancesAupairComponent
  }
  ,
  {
    path: RouteConstant.FOR_FAMILY,
    component: ForFamilyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
