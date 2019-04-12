import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { SettingMenuComponent } from '../components/settings-menu/settings-menu.component';

@NgModule({
    declarations: [
        SettingMenuComponent
    ],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [
        SettingMenuComponent
    ]
})
export class ComponentsModule { }