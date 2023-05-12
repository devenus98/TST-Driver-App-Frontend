import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartingdutyPage } from './startingduty.page';

const routes: Routes = [
  {
    path: '',
    component: StartingdutyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartingdutyPageRoutingModule {}
