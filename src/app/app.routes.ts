import {Routes} from '@angular/router';
import {LoginComponent} from './features/auth/login/login.component';
import {authGuard} from './core/guards/auth.guard';
import {LayoutComponent} from './core/components/layout/layout.component';
import {HomeComponent} from './features/home/home.component';
import {CandidateComponent} from './features/candidate/candidate.component';
import {JobComponent} from './features/job/job.component';
import {InterviewComponent} from './features/interview/interview.component';
import {ForbiddenComponent} from './features/auth/forbidden/forbidden.component';
import {NotFoundComponent} from './features/auth/not-found/not-found.component';
import {ErrorComponent} from './features/auth/error/error.component';
import {AccountComponent} from './features/account/account.component';

export const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', component: LayoutComponent, canActivate: [authGuard],
    children: [
      {path: '', component: HomeComponent},
      {path: 'candidate', component: CandidateComponent},
      {path: 'job', component: JobComponent},
      {path: 'interview', component: InterviewComponent},
      {path: 'account', component: AccountComponent},
      {path: 'forbidden', component: ForbiddenComponent},
      {path: 'not-found', component: NotFoundComponent},
      {path: 'error', component: ErrorComponent}
    ]
  },
  {path: '**', redirectTo: 'not-found'}
];
