import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
})
export class DetailsPage {
    event: any;

    constructor(private modalController: ModalController, private navParams: NavParams) { }

    ionViewWillEnter() {
        this.event = this.navParams.get('event');
    }

    async dismiss() {
        await this.modalController.dismiss();
    }
}
