import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './services/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'createpassword',
    loadChildren: () => import('./createpassword/createpassword.module').then( m => m.CreatepasswordPageModule)
  },
  {
    path: 'sleepmode',
    loadChildren: () => import('./sleepmode/sleepmode.module').then( m => m.SleepmodePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'applyforleave',
    loadChildren: () => import('./applyforleave/applyforleave.module').then( m => m.ApplyforleavePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'startingduty',
    loadChildren: () => import('./startingduty/startingduty.module').then( m => m.StartingdutyPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'myleaves',
    loadChildren: () => import('./myleaves/myleaves.module').then( m => m.MyleavesPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'editvacation',
    loadChildren: () => import('./editvacation/editvacation.module').then( m => m.EditvacationPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'logbook',
    loadChildren: () => import('./logbook/logbook.module').then( m => m.LogbookPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'onduty',
    loadChildren: () => import('./onduty/onduty.module').then( m => m.OndutyPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'resumedutyhour',
    loadChildren: () => import('./resumedutyhour/resumedutyhour.module').then( m => m.ResumedutyhourPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'changepassword',
    loadChildren: () => import('./changepassword/changepassword.module').then( m => m.ChangepasswordPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'updateprofile',
    loadChildren: () => import('./editprofile/editprofile.module').then( m => m.EditprofilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
