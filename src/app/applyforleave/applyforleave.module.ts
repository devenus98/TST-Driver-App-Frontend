import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplyforleavePageRoutingModule } from './applyforleave-routing.module';

import { ApplyforleavePage } from './applyforleave.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplyforleavePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [ApplyforleavePage]
})
export class ApplyforleavePageModule { }
