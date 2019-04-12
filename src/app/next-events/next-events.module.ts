import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';

import { NextEventsPage } from './next-events.page';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        ComponentsModule,
        RouterModule.forChild([{ path: '', component: NextEventsPage }])
    ],
    declarations: [
        NextEventsPage
    ]
})
export class NextEventsPageModule {}
