import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { SettingMenuComponent } from '../components/settings-menu/settings-menu.component';
import { HeaderComponent } from '../components/header/header.component';

@NgModule({
    declarations: [
        SettingMenuComponent,
        HeaderComponent
    ],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [
        SettingMenuComponent,
        HeaderComponent
    ]
})
export class ComponentsModule { }