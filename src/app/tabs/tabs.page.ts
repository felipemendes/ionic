import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

    constructor (public navController: NavController, public storage: Storage) {}

    ngOnInit() {
        this.storage.get('intro-done').then(done => {
            if (!done) {
                this.storage.set('intro-done', true);
                this.navController.navigateRoot('/intro');
            }
        });
    }
}
