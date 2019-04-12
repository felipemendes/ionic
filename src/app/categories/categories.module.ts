import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';

import { CategoriesPage } from './categories.page';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        ComponentsModule,
        RouterModule.forChild([{ path: '', component: CategoriesPage }])
    ],
    declarations: [
        CategoriesPage
    ]
})
export class CategoriesPageModule {}
