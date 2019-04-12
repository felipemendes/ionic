import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';

import { CityPage } from './city.page';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        ComponentsModule,
        RouterModule.forChild([{ path: '', component: CityPage }])
    ],
    declarations: [
        CityPage
    ]
})
export class CityPageModule {}
