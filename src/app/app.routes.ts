import {Routes} from '@angular/router';
import {LoginComponent} from './features/auth/login/login.component';
import {authGuard} from './core/guards/auth.guard';
import {LayoutComponent} from './core/components/layout/layout.component';
import {RegisterComponent} from './features/auth/register/register.component';
import {HomeComponent} from './features/home/home.component';
import {CandidateComponent} from './features/candidate/candidate.component';
import {JobComponent} from './features/job/job.component';
import {InterviewComponent} from './features/interview/interview.component';
import {OfferComponent} from './features/offer/offer.component';

export const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: '', component: LayoutComponent, canActivate: [authGuard],
    children: [
      {path: '', component: HomeComponent},
      {path: 'candidate', component: CandidateComponent},
      {path: 'job', component: JobComponent},
      {path: 'interview', component: InterviewComponent},
      {path: 'offer', component: OfferComponent},
    ]
  },
];
