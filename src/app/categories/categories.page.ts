import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
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

    constructor(
            private iab: InAppBrowser, 
            public actionSheetController: ActionSheetController, 
            public modalController: ModalController, 
            private categoriesService: CategoriesService, 
            public navController: NavController, 
            public storage: Storage, 
            private socialSharing: SocialSharing,
            public loadingController: LoadingController
        ) {
        this.toolbarColor = 'dark';
    }

    async loadData() {
        const loading = await this.loadingController.create({
            message: 'Preparando os eventos...'
        });
        await loading.present();

        this.categoriesService
        .fetchFeed('categories')
        .subscribe(async data => {
            this.categories = data;
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
        this.socialSharing.shareViaEmail(null, 'Indicação de evento - PurAí', ['contato@purai.io'], null, null, null).then(() => {
          // Success
        }).catch((e) => {
          // Error!
        });
    }
}
