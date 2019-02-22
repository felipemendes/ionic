import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { ModalController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';

@Component({
    selector: 'app-featured',
    templateUrl: 'featured.page.html',
    styleUrls: ['featured.page.scss']
})
export class FeaturedPage implements OnInit {

    sliderConfig = {
        slidesPerView: 1.2
    };

    featuredEvents: any = [];
    trendingEvents: any = [];

    constructor(public modalController: ModalController, private eventsService: EventsService) {}

    ngOnInit() {
        this.eventsService
            .fetchFeed('events?featured=1')
            .subscribe(data => {
                this.featuredEvents = data;
            })

        this.eventsService
            .fetchFeed('events?trending=1')
            .subscribe(data => {
                this.trendingEvents = data;
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
