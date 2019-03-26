import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
})
export class DetailsPage {
    event: any;

    constructor(private modalController: ModalController, private navParams: NavParams, private socialSharing: SocialSharing, private iab: InAppBrowser) { }

    ionViewWillEnter() {
        this.event = this.navParams.get('event');
    }

    async openUrl(url: string) {
        this.iab.create(url, '_system');
    }

    async dismiss() {
        await this.modalController.dismiss();
    }

    async shareTwitter() {
        this.socialSharing.shareViaTwitter(`Ei, vai rolar ${this.event.title} em ${this.event.city.title}. Saiba mais sobre esse e outros eventos no app PurAí.`, this.event.image, 'URL').then(() => {
            // Success
        }).catch((e) => {
            // Error!
        });
    }
    
    async shareWhatsApp() {
        this.socialSharing.shareViaWhatsApp(`Ei, vai rolar ${this.event.title} em ${this.event.city.title}. Saiba mais sobre esse e outros eventos no app PurAí.`, this.event.image, 'URL').then(() => {
            // Success
        }).catch((e) => {
            // Error!
        });
    }

    async shareEmail() {
        this.socialSharing.shareViaEmail(`Ei, vai rolar ${this.event.title} em ${this.event.city.title}. Saiba mais sobre esse e outros eventos no app PurAí.`, 'Subject', ['mailto@mail.com'], null, null, null).then(() => {
            // Success
        }).catch((e) => {
            // Error!
        });
    }
    
    async shareFacebook() {
        this.socialSharing.shareViaFacebook(`Ei, vai rolar ${this.event.title} em ${this.event.city.title}. Saiba mais sobre esse e outros eventos no app PurAí.`, this.event.image, 'URL').then(() => {
            // Success
        }).catch((e) => {
            // Error!
        });
    }
}
