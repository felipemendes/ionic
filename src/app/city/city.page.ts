import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { EventsService } from '../services/events.service';
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

    toolbarColor: string;
    cities: any = [];
    events: any = [];
    
    constructor(
            private iab: InAppBrowser, 
            public actionSheetController: ActionSheetController, 
            public modalController: ModalController, 
            private citiesService: CitiesService, 
            private eventsService: EventsService, 
            public navController: NavController, 
            public storage: Storage, private socialSharing: SocialSharing, 
            public loadingController: LoadingController
        ) {
        this.toolbarColor = 'dark';
    }

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
    
        this.eventsService
            .fetchFeed('events?status=publish&status=future')
            .subscribe(async data => {
                this.events = data;
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

    async settings_menu() {
        const actionSheet = await this.actionSheetController.create({
            buttons: [
                {
                    text: 'Sobre',
                    icon: 'information-circle-outline',
                    handler: () => {
                        this.iab.create('https://purai.io', '_system');
                    }
                },{
                    text: 'Indique seu evento',
                    icon: 'checkmark-circle-outline',
                    handler: () => {
                        this.shareEmail()
                    }
                },
                {
                    text: 'Sair',
                    icon: 'log-out',
                    handler: () => {
                        this.storage.get('intro-done').then(done => {
                            if (done) {
                                this.storage.set('intro-done', true);
                                this.navController.navigateRoot('/intro');
                            }
                        });
                    }
                },
                {
                    text: 'Cancelar',
                    icon: 'close',
                    role: 'cancel'
                }
            ]
        });
        await actionSheet.present();
    }

    async shareEmail() {
        this.socialSharing.shareViaEmail(null, 'Sugestão de evento - PurAí', ['felipemendes@me.com'], null, null, null).then(() => {
          // Success
        }).catch((e) => {
          // Error!
        });
    }
}
