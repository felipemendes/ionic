import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SiriShortcutsPage } from './siri-shortcuts.page';

const routes: Routes = [
  {
    path: '',
    component: SiriShortcutsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SiriShortcutsPage]
})
export class SiriShortcutsPageModule {}
