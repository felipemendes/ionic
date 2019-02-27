import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { EventsByCategoryPage } from './events-by-category/events-by-category.page';
import { DetailsPage } from './details/details.page';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
    declarations: [
        AppComponent,
        DetailsPage,
        EventsByCategoryPage
    ],
    entryComponents: [
        DetailsPage, 
        EventsByCategoryPage
    ],
    imports: [
        BrowserModule, 
        IonicModule.forRoot(), 
        AppRoutingModule, 
        HttpClientModule,
        IonicStorageModule.forRoot()
    ],
    providers: [
        SocialSharing,
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
