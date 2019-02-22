import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { CitiesService } from '../cities.service';
import { ModalController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';

@Component({
    selector: 'app-city',
    templateUrl: 'city.page.html',
    styleUrls: ['city.page.scss']
})
export class CityPage implements OnInit {
  
    sliderConfig = {
        slidesPerView: 1.2
    };

    cities: any = [];
    events: any = [];
    
    constructor(public modalController: ModalController, private citiesService: CitiesService, private eventsService: EventsService) {}

    ngOnInit() {
        this.citiesService
            .fetchFeed('cities')
            .subscribe(data => {
                this.cities = data;
            })

        this.eventsService
            .fetchFeed('events')
            .subscribe(data => {
                this.events = data;
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
