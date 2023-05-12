import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogbookPageRoutingModule } from './logbook-routing.module';

// import { LogbookPage } from './logbook.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogbookPageRoutingModule,
    TranslateModule
  ],
  declarations: []
})
export class LogbookPageModule { }
