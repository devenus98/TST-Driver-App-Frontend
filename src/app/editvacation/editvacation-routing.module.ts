import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditvacationPage } from './editvacation.page';

const routes: Routes = [
  {
    path: ':id',
    component: EditvacationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditvacationPageRoutingModule {}
