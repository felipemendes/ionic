import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { EventsService } from '../services/events.service';
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
    previousEvents: any = [];

    constructor(
            private modalController: ModalController, 
            private eventsService: EventsService, 
            private loadingController: LoadingController
        ) { }

    async loadData() {
        const loading = await this.loadingController.create({
            message: 'Carregando os eventos...'
        });
        await loading.present();

        this.eventsService
            .fetchFeed('events?featured=1')
            .subscribe(async data => {
                this.featuredEvents = data;
                await loading.dismiss();
            })

        this.eventsService
            .fetchFeed('events?trending=1')
            .subscribe(async data => {
                this.trendingEvents = data;
                await loading.dismiss();
            })

        this.eventsService
            .fetchFeed('events?status=publish&per-page=4')
            .subscribe(async data => {
                this.previousEvents = data;
                await loading.dismiss();
            })
    }

    ngOnInit() {
        this.loadData();
    }

    doRefresh(event) {
        this.loadData();
        setTimeout(() => {
            event.target.complete();
        }, 1000);
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
