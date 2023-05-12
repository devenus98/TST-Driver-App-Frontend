import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumedutyhourPageRoutingModule } from './resumedutyhour-routing.module';

import { ResumedutyhourPage } from './resumedutyhour.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumedutyhourPageRoutingModule,
    TranslateModule
  ],
  declarations: [ResumedutyhourPage]
})
export class ResumedutyhourPageModule { }
