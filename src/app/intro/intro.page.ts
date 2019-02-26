import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-intro',
    templateUrl: './intro.page.html',
    styleUrls: ['./intro.page.scss'],
})
export class IntroPage {

    constructor(public navController: NavController) { }

    goHome() {
        this.navController.navigateRoot('/tabs');
    }
}
