import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { CategoriesService } from '../categories.service';
import { EventsByCategoryPage } from '../events-by-category/events-by-category.page';

@Component({
    selector: 'app-categories',
    templateUrl: 'categories.page.html',
    styleUrls: ['categories.page.scss']
})
export class CategoriesPage implements OnInit {
    categories: any = [];

    constructor(public modalController: ModalController, private categoriesService: CategoriesService) {}

    ngOnInit() {
        this.categoriesService
        .fetchFeed('categories')
        .subscribe(data => {
            this.categories = data;
        })
    }

    async showEvents(categorySlug:string, categoryTitle:string) {
        const modal = await this.modalController.create({
            component: EventsByCategoryPage,
            componentProps: {
                categorySlug: categorySlug,
                categoryTitle: categoryTitle
            }
        });
        return await modal.present();
    }
}
