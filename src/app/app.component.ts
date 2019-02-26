import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(private ga: GoogleAnalytics, private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleBlackTranslucent();
            this.splashScreen.show();
        });

        this.ga.startTrackerWithId('UA-132748814-5')
            .then(() => {
                console.log('Google analytics is ready now');
                this.ga.trackView('test');
            })
            .catch(e => console.log('Error starting GoogleAnalytics', e)
        );
    }
}
