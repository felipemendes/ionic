import { Component } from '@angular/core';
import { NavParams, ModalController, Platform, AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Calendar } from '@ionic-native/calendar/ngx';

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
})
export class DetailsPage {
    event: any;

    constructor(
            private modalController: ModalController, 
            private navParams: NavParams, 
            private socialSharing: SocialSharing, 
            private iab: InAppBrowser,
            private callNumber: CallNumber,
            private calendar: Calendar,
            private platform: Platform,
            private alertController: AlertController
        ) { }

    ionViewWillEnter() {
        this.event = this.navParams.get('event');
    }

    async dismiss() {
        await this.modalController.dismiss();
    }

    addToCalendar(event: any) {
        this.platform.ready().then(() => {
            this.calendar.createEventInteractively(event.title, event.where, `${event.date}. Evento adicionado pelo PurAí.`);
        });
    }

    async openUrl(url: string) {
        this.iab.create(url, '_system');
    }

    call(number: string) {
        this.callNumber.callNumber(number.replace(/[^0-9\.]+/g, ""), true);
    }

    async shareTwitter() {
        this.socialSharing.shareViaTwitter(`Ei, vai rolar ${this.event.title} em ${this.event.city.title}. Saiba mais sobre esse e outros eventos no app PurAí.`, this.event.image, 'https://itunes.apple.com/us/app/pura%C3%AD/id1067098059?l=pt&ls=1&mt=8');
    }
    
    async shareWhatsApp() {
        this.socialSharing.shareViaWhatsApp(`Ei, vai rolar ${this.event.title} em ${this.event.city.title}. Saiba mais sobre esse e outros eventos no app PurAí.`, this.event.image, 'https://itunes.apple.com/us/app/pura%C3%AD/id1067098059?l=pt&ls=1&mt=8');
    }

    async shareEmail() {
        this.socialSharing.shareViaEmail(`Ei, vai rolar ${this.event.title} em ${this.event.city.title}. Saiba mais sobre esse e outros eventos no app PurAí.`, 'PurAí', ['contato@purai.io'], null, null, null);
    }
    
    async shareFacebook() {
        this.socialSharing.shareViaFacebook(`Ei, vai rolar ${this.event.title} em ${this.event.city.title}. Saiba mais sobre esse e outros eventos no app PurAí.`, this.event.image, 'https://itunes.apple.com/us/app/pura%C3%AD/id1067098059?l=pt&ls=1&mt=8');
    }

    async presentAlert(header:string, subHeader:string) {
        const alert = await this.alertController.create({
          header: header,
          subHeader: subHeader,
          buttons: ['OK']
        });
    
        await alert.present();
      }
}
