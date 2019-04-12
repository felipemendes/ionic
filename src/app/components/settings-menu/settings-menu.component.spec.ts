import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingMenuComponent } from './settings-menu.component';

describe('SettingsMenuPage', () => {
    let component: SettingMenuComponent;
    let fixture: ComponentFixture<SettingMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ SettingMenuComponent ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
