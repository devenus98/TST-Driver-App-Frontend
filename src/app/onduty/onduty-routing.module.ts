import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OndutyPage } from './onduty.page';

const routes: Routes = [
  {
    path: '',
    component: OndutyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OndutyPageRoutingModule {}
