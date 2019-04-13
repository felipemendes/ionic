import { Component, OnInit } from '@angular/core';
import { SiriShortcuts } from '@ionic-native/siri-shortcuts/ngx';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-siri-shortcuts',
    templateUrl: './siri-shortcuts.page.html',
    styleUrls: ['./siri-shortcuts.page.scss'],
})
export class SiriShortcutsPage {

    constructor(
            private modalController: ModalController,
            private siriShortcuts: SiriShortcuts
        ) { }

    async dismiss() {
        await this.modalController.dismiss();
    }

    addShortcut(cmd:string, action:string) {
        this.siriShortcuts.present({
                persistentIdentifier: action,
                title: cmd,
                suggestedInvocationPhrase: cmd,
                userInfo: { action: action },
        })
        .then(() => console.log('Shortcut added.'))
        .catch((error: any) => console.error(error));
    }
}
