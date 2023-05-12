import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SleepmodePageRoutingModule } from './sleepmode-routing.module';

import { SleepmodePage } from './sleepmode.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SleepmodePageRoutingModule,
    TranslateModule
  ],
  declarations: [SleepmodePage]
})
export class SleepmodePageModule { }
