import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { EventsService } from '../services/events.service';
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
    previousEvents: any = [];

    constructor(
            public modalController: ModalController,
            private eventsService: EventsService,
            public loadingController: LoadingController
        ) { }
    
    async loadData() {
        const loading = await this.loadingController.create({
            message: 'Carregando os eventos...'
        });
        await loading.present();

        this.eventsService
            .fetchFeed('events?today')
            .subscribe(async data => {
                this.todayEvents = data;
                await loading.dismiss();
            })

        this.eventsService
            .fetchFeed('events')
            .subscribe(async data => {
                this.nextEvents = data;
                await loading.dismiss();
            })

        this.eventsService
            .fetchFeed('events?status=publish')
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
