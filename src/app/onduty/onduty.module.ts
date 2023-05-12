import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OndutyPageRoutingModule } from './onduty-routing.module';

import { OndutyPage } from './onduty.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OndutyPageRoutingModule,
    TranslateModule
  ],
  declarations: [OndutyPage]
})
export class OndutyPageModule { }
