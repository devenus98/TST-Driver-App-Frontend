import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatepasswordPage } from './createpassword.page';

const routes: Routes = [
  {
    path: '',
    component: CreatepasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatepasswordPageRoutingModule {}
