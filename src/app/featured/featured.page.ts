import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { EventsService } from '../events.service';
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

    constructor(private iab: InAppBrowser, public actionSheetController: ActionSheetController, public modalController: ModalController, private eventsService: EventsService) {
        this.toolbarColor = 'primary';
    }

    ngOnInit() {
        this.eventsService
            .fetchFeed('events?featured=1')
            .subscribe(data => {
                this.featuredEvents = data;
            })

        this.eventsService
            .fetchFeed('events?trending=1')
            .subscribe(data => {
                this.trendingEvents = data;
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

    async settings_menu() {
        const actionSheet = await this.actionSheetController.create({
            buttons: [
                {
                    text: 'Sobre',
                    icon: 'help',
                    handler: () => {
                        const browser = this.iab.create('https://google.com');
                        browser.show();
                    }
                },{
                    text: 'Cancelar',
                    icon: 'close',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        await actionSheet.present();
    }
}
