import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumedutyhourPage } from './resumedutyhour.page';

const routes: Routes = [
  {
    path: '',
    component: ResumedutyhourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumedutyhourPageRoutingModule {}
