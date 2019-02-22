import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { ModalController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';

@Component({
    selector: 'app-next-events',
    templateUrl: 'next-events.page.html',
    styleUrls: ['next-events.page.scss']
})
export class NextEventsPage implements OnInit {

    sliderConfig = {
        slidesPerView: 1.2
    };

    todayEvents: any = [];
    nextEvents: any = [];

    constructor(public modalController: ModalController, private eventsService: EventsService) {}

    ngOnInit() {
        this.eventsService
            .fetchFeed('events?today')
            .subscribe(data => {
                this.todayEvents = data;
            })

        this.eventsService
            .fetchFeed('events')
            .subscribe(data => {
                this.nextEvents = data;
            })
    }

    async showDetails(event: any) {
        const modal = await this.modalController.create({
            component: DetailsPage,
            componentProps: {
                event: event
            }
        });
        return await modal.present();
    }
}
