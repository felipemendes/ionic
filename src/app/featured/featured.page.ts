import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
import { LoadingController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { EventsService } from '../services/events.service';
import { DetailsPage } from '../details/details.page';
import { SiriShortcutsPage } from '../siri-shortcuts/siri-shortcuts.page';

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
            private actionSheetController: ActionSheetController, 
            private modalController: ModalController, 
            private eventsService: EventsService, 
            private navController: NavController, 
            private storage: Storage, private socialSharing: SocialSharing, 
            private loadingController: LoadingController,
            private platform: Platform
        ) {
        this.toolbarColor = 'dark';
    }

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

    async settings_menu() {
        const actionSheet = await this.actionSheetController.create({
            buttons: this.createButtons()
        });
        await actionSheet.present();
    }

    createButtons() {
        let buttons = [];

        if (this.platform.is('ios')) {
            let siriButton = {
                text: 'Atalhos da Siri',
                icon: null,
                handler: async () => {
                    const modal = await this.modalController.create({
                        component: SiriShortcutsPage
                    });
                    return await modal.present();
                }
            }
            buttons.push(siriButton);
        }

        let recomendationButton = {
            text: 'Indique seu evento',
            icon: !this.platform.is('ios') ? 'checkmark-circle-outline' : null,
            handler: () => {
                this.shareEmail();
            }
        }
        buttons.push(recomendationButton);

        let aboutButton = {
            text: 'Sobre',
            icon: !this.platform.is('ios') ? 'information-circle-outline' : null,
            handler: () => {
                this.iab.create('https://purai.io', '_system');
            }
        }
        buttons.push(aboutButton);

        let exitButton = {
            text: 'Sair',
            icon: !this.platform.is('ios') ? 'log-out' : null,
            handler: () => {
                this.storage.get('intro-done').then(done => {
                    if (done) {
                        this.storage.set('intro-done', true);
                        this.navController.navigateRoot('/intro');
                    }
                });
            }
        }
        buttons.push(exitButton);

        let cancelButton = {
            text: 'Cancelar',
            icon: !this.platform.is('ios') ? 'close' : null,
            role: 'cancel'
        }
        buttons.push(cancelButton);

        return buttons;
    }

    async shareEmail() {
        this.socialSharing.shareViaEmail(null, 'Sugestão de evento - PurAí', ['felipemendes@me.com'], null, null, null);
    }
}

