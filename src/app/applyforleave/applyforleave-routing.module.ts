import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplyforleavePage } from './applyforleave.page';

const routes: Routes = [
  {
    path: '',
    component: ApplyforleavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplyforleavePageRoutingModule {}
