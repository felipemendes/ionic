import { Component } from '@angular/core';
import { ModalController, ActionSheetController, NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SiriShortcutsPage } from 'src/app/siri-shortcuts/siri-shortcuts.page';

@Component({
    selector: 'app-settings-menu',
    templateUrl: './settings-menu.component.html',
    styleUrls: ['./settings-menu.component.scss'],
})
export class SettingMenuComponent {

    constructor(
        private iab: InAppBrowser,
        private modalController: ModalController,
        private actionSheetController: ActionSheetController,
        private navController: NavController,
        private storage: Storage,
        private socialSharing: SocialSharing,
        private platform: Platform
    ) { }

    async settings_menu() {
        const actionSheet = await this.actionSheetController.create({
            buttons: this.createButtons()
        });
        await actionSheet.present();
    }

    createButtons() {
        let buttons = [];

        if (this.platform.is('ios')) {
            let siriButton = {
                text: 'Atalhos da Siri',
                icon: null,
                handler: async () => {
                    const modal = await this.modalController.create({
                        component: SiriShortcutsPage
                    });
                    return await modal.present();
                }
            }
            buttons.push(siriButton);
        }

        let recomendationButton = {
            text: 'Indique seu evento',
            icon: !this.platform.is('ios') ? 'checkmark-circle-outline' : null,
            handler: () => {
                this.shareEmail();
            }
        }
        buttons.push(recomendationButton);

        let aboutButton = {
            text: 'Sobre o app',
            icon: !this.platform.is('ios') ? 'information-circle-outline' : null,
            handler: () => {
                this.iab.create('https://purai.io', '_system');
            }
        }
        buttons.push(aboutButton);

        // let exitButton = {
        //     text: 'Sair',
        //     icon: !this.platform.is('ios') ? 'log-out' : null,
        //     handler: () => {
        //         this.storage.get('intro-done').then(done => {
        //             if (done) {
        //                 this.storage.set('intro-done', true);
        //                 this.navController.navigateRoot('/intro');
        //             }
        //         });
        //     }
        // }
        // buttons.push(exitButton);

        let cancelButton = {
            text: 'Cancelar',
            icon: !this.platform.is('ios') ? 'close' : null,
            role: 'cancel'
        }
        buttons.push(cancelButton);

        return buttons;
    }

    async shareEmail() {
        this.socialSharing.shareViaEmail(null, 'Sugestão de evento - PurAí', ['felipemendes@me.com'], null, null, null);
    }  
}
