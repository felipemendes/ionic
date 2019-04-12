import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { CitiesService } from '../services/cities.service';
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
    
    constructor(
            public actionSheetController: ActionSheetController, 
            public modalController: ModalController, 
            private citiesService: CitiesService,
            public navController: NavController, 
            public storage: Storage, 
            public loadingController: LoadingController
        ) { }

    async loadData() {
        const loading = await this.loadingController.create({
            message: 'Carregando os eventos...'
        });
        await loading.present();

        this.citiesService
            .fetchFeed('cities')
            .subscribe(async data => {
                this.cities = data;
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
