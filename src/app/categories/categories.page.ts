import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { CategoriesService } from '../services/categories.service';
import { EventsByCategoryPage } from '../events-by-category/events-by-category.page';

@Component({
    selector: 'app-categories',
    templateUrl: 'categories.page.html',
    styleUrls: ['categories.page.scss']
})
export class CategoriesPage implements OnInit {

    categories: any = [];

    constructor(
            public modalController: ModalController, 
            private categoriesService: CategoriesService, 
            public storage: Storage, 
            public loadingController: LoadingController,
        ) { }

    async loadData() {
        const loading = await this.loadingController.create({
            message: 'Carregando as categorias...'
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
}
