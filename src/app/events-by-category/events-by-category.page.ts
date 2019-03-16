import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { EventsService } from '../services/events.service';
import { DetailsPage } from '../details/details.page';

@Component({
    selector: 'app-events-by-category',
    templateUrl: './events-by-category.page.html',
    styleUrls: ['./events-by-category.page.scss'],
})
export class EventsByCategoryPage implements OnInit {
    category: any;
    events: any;
    previousEvents: any = [];

    constructor(private modalController: ModalController, private navParams: NavParams, private eventsService: EventsService) { }

    loadData() {
        this.eventsService
            .fetchFeed(`events?category=${this.category.slug}`)
            .subscribe(data => {
                this.events = data;
            })

        this.eventsService
            .fetchFeed(`events?category=${this.category.slug}&status=publish&per-page=10`)
            .subscribe(data => {
                this.previousEvents = data;
            })
    }

    ngOnInit() {
        this.loadData();
    }
    
    ionViewWillEnter() {
        this.category = this.navParams.get('category');
    }

    async dismiss() {
        await this.modalController.dismiss();
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