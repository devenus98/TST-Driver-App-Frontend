import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditvacationPageRoutingModule } from './editvacation-routing.module';

import { EditvacationPage } from './editvacation.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditvacationPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [EditvacationPage]
})
export class EditvacationPageModule { }
