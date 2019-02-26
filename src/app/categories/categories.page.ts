import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CategoriesService } from '../services/categories.service';
import { EventsByCategoryPage } from '../events-by-category/events-by-category.page';

@Component({
    selector: 'app-categories',
    templateUrl: 'categories.page.html',
    styleUrls: ['categories.page.scss']
})
export class CategoriesPage implements OnInit {
    
    toolbarColor: string;
    categories: any = [];

    constructor(private iab: InAppBrowser, public actionSheetController: ActionSheetController, public modalController: ModalController, private categoriesService: CategoriesService) {
        this.toolbarColor = 'primary';
    }

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
