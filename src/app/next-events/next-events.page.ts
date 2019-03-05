import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
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

    toolbarColor: string;
    todayEvents: any = [];
    nextEvents: any = [];
    previousEvents: any = [];

    constructor(private iab: InAppBrowser, public actionSheetController: ActionSheetController, public modalController: ModalController, private eventsService: EventsService, public navController: NavController, public storage: Storage, private socialSharing: SocialSharing) {
        this.toolbarColor = 'dark';
    }

    loadData() {
        this.eventsService
            .fetchFeed('events?today')
            .subscribe(data => {
                this.todayEvents = data;
            })

        this.eventsService
            .fetchFeed('events')
            .subscribe(data => {
                this.nextEvents = data;
            })

        this.eventsService
            .fetchFeed('events?status=publish')
            .subscribe(data => {
                this.previousEvents = data;
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
                        this.iab.create('http://purai.io', '_system');
                    }
                },{
                    text: 'Sugerir evento',
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
