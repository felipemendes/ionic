import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { EventsService } from '../events.service';
import { DetailsPage } from '../details/details.page';

@Component({
    selector: 'app-events-by-category',
    templateUrl: './events-by-category.page.html',
    styleUrls: ['./events-by-category.page.scss'],
})
export class EventsByCategoryPage implements OnInit {
    categorySlug: any;
    categoryTitle: any;
    events: any;

    constructor(private modalController: ModalController, private navParams: NavParams, private eventsService: EventsService) { }

    ngOnInit() {
        this.eventsService
            .fetchFeed(`events?category=${this.categorySlug}`)
            .subscribe(data => {
                this.events = data;
            })
    }

    ionViewWillEnter() {
        this.categorySlug = this.navParams.get('categorySlug');
        this.categoryTitle = this.navParams.get('categoryTitle');
        console.log(this.categoryTitle);
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