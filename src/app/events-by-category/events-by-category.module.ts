import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventsByCategoryPage } from './events-by-category.page';

const routes: Routes = [
    {
        path: '',
        component: EventsByCategoryPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [EventsByCategoryPage]
})
export class EventsByCategoryPageModule {}
