import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { DashboardPage } from '../dashboard/dashboard.page';
import { StartingdutyPage } from '../startingduty/startingduty.page';
import { LogbookPage } from '../logbook/logbook.page';
import { TranslateModule } from '@ngx-translate/core';
const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'dashboard',
                component: DashboardPage
            },
            {
                path: 'startingduty',
                component: StartingdutyPage
            },
            {
                path: 'logbook',
                component: LogbookPage
            },
        ]
    },
    {

        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
    }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TabsPageRoutingModule,
        RouterModule.forChild(routes),
        TranslateModule
    ],
    declarations: [TabsPage, DashboardPage, StartingdutyPage, LogbookPage]
})
export class TabsPageModule { }
