import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SiriShortcut, SiriShortcuts } from '@ionic-native/siri-shortcuts/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(
            private navController: NavController,
            private platform: Platform,
            private splashScreen: SplashScreen,
            private statusBar: StatusBar,
            private siriShortcuts: SiriShortcuts) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleBlackTranslucent();
            this.splashScreen.show();

            this.platform.resume.subscribe((result)=>{
                this.siriShortcuts.getActivatedShortcut()
                .then((data: SiriShortcut|null) =>  {
                }).catch((error: any) =>  {
                    this.goToTab(error.userInfo.action);
                });
            });
        });
    }

    goToTab(tab:string) {
        this.navController.navigateRoot(`/tabs/${tab}`);
    }
}
