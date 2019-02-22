import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { CategoriesService } from '../categories.service';
import { EventsByCategoryPage } from '../events-by-category/events-by-category.page';

@Component({
    selector: 'app-categories',
    templateUrl: 'categories.page.html',
    styleUrls: ['categories.page.scss']
})
export class CategoriesPage implements OnInit {
    categories: any = [];

    constructor(public actionSheetController: ActionSheetController, public modalController: ModalController, private categoriesService: CategoriesService) {}

    ngOnInit() {
        this.categoriesService
        .fetchFeed('categories')
        .subscribe(data => {
            this.categories = data;
        })
    }

    async showEvents(category: any) {
        const modal = await this.modalController.create({
            component: EventsByCategoryPage,
            componentProps: {
                category: category
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
