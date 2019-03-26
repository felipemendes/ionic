import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
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

    toolbarColor: string;
    featuredEvents: any = [];
    trendingEvents: any = [];
    previousEvents: any = [];

    constructor(
            private iab: InAppBrowser, 
            public actionSheetController: ActionSheetController, 
            public modalController: ModalController, 
            private eventsService: EventsService, 
            public navController: NavController, 
            public storage: Storage, private socialSharing: SocialSharing, 
            public loadingController: LoadingController
        ) {
        this.toolbarColor = 'dark';
    }

    async loadData() {
        const loading = await this.loadingController.create({
            message: 'Preparando os eventos...'
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
            .fetchFeed('events?status=publish&per-page=10')
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
                // {
                //     text: 'Sair',
                //     icon: 'log-out',
                //     handler: () => {
                //         this.storage.get('intro-done6').then(done => {
                //             if (done) {
                //                 this.storage.set('intro-done6', true);
                //                 this.navController.navigateRoot('/intro');
                //             }
                //         });
                //     }
                // },
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

