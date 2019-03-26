import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
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

    constructor(
            private modalController: ModalController, 
            private navParams: NavParams, 
            private eventsService: EventsService, 
            public loadingController: LoadingController
        ) { }

    async loadData() {
        const loading = await this.loadingController.create({
            message: 'Preparando os eventos...'
        });
        await loading.present();

        this.eventsService
            .fetchFeed(`events?category=${this.category.slug}`)
            .subscribe(async data => {
                this.events = data;
                await loading.dismiss();
            })

        this.eventsService
            .fetchFeed(`events?category=${this.category.slug}&status=publish&per-page=10`)
            .subscribe(async data => {
                this.previousEvents = data;
                await loading.dismiss();
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