import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SleepmodePage } from './sleepmode.page';

const routes: Routes = [
  {
    path: '',
    component: SleepmodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SleepmodePageRoutingModule {}
