import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatepasswordPageRoutingModule } from './createpassword-routing.module';

import { CreatepasswordPage } from './createpassword.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatepasswordPageRoutingModule,
    TranslateModule
  ],
  declarations: [CreatepasswordPage]
})
export class CreatepasswordPageModule {}
