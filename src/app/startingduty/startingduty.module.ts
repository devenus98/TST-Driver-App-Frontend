import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartingdutyPageRoutingModule } from './startingduty-routing.module';

// import { StartingdutyPage } from './startingduty.page';

import { CalendarModule } from 'ion2-calendar';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartingdutyPageRoutingModule,
    CalendarModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [],
  providers: [DatePipe]
})
export class StartingdutyPageModule {
}
