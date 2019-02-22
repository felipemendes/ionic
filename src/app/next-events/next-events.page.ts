import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { ModalController, ActionSheetController } from '@ionic/angular';
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

    constructor(public actionSheetController: ActionSheetController, public modalController: ModalController, private eventsService: EventsService) {}

    ngOnInit() {
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
                        console.log('Sobre clicked');
                    }
                }, {
                    text: 'Sair',
                    icon: 'exit',
                    handler: () => {
                        console.log('Sair clicked');
                    }
                }, {
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
