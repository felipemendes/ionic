import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
})
export class DetailsPage {
    event: any;

    constructor(private modalController: ModalController, private navParams: NavParams, private socialSharing: SocialSharing) { }

    ionViewWillEnter() {
        this.event = this.navParams.get('event');
    }

    async dismiss() {
        await this.modalController.dismiss();
    }

    async shareTwitter() {
        this.socialSharing.shareViaTwitter('Message', this.event.image, 'URL').then(() => {
          // Success
        }).catch((e) => {
          // Error!
        });
      }
     
      async shareWhatsApp() {
        this.socialSharing.shareViaWhatsApp('Message', this.event.image, 'URL').then(() => {
          // Success
        }).catch((e) => {
          // Error!
        });
      }

      async shareEmail() {
        this.socialSharing.shareViaEmail('Message', 'Subject', ['mailto@mail.com'], null, null, null).then(() => {
          // Success
        }).catch((e) => {
          // Error!
        });
      }
     
      async shareFacebook() {
        this.socialSharing.shareViaFacebook('Message', this.event.image, 'URL').then(() => {
          // Success
        }).catch((e) => {
          // Error!
        });
      }
}
