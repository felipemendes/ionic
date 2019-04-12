import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';

import { FeaturedPage } from './featured.page';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        ComponentsModule,
        RouterModule.forChild([{ path: '', component: FeaturedPage }])
    ],
    declarations: [
        FeaturedPage
    ]
})
export class FeaturedPageModule {}
