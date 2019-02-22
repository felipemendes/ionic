import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
    event: any;

    constructor(private modalController: ModalController, private navParams: NavParams, private eventService: EventsService) { }

    ngOnInit() {
        this.event = this.eventService.currentEvent;
    }

    ionViewWillEnter() {
        this.event = this.navParams.get('event'); 
        console.log(this.event.title);
    }

    async dismiss() {
        await this.modalController.dismiss();
    }
}
