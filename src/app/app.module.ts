import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { AccueilPage } from '../pages/accueil/accueil';
import { AProposPage } from '../pages/a-propos/a-propos';
import { ContactPage } from '../pages/contact/contact';
import { ServiceCartePage } from '../pages/service-carte/service-carte';
import { ServiceDetailsPage } from '../pages/service-details/service-details';
import { ServicesPage } from '../pages/services/services';
import { PanierPage } from '../pages/panier/panier'
import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BrowserTab } from '@ionic-native/browser-tab';
import { DocumentViewer } from '@ionic-native/document-viewer'


@NgModule({
  declarations: [
    MyApp,
    AccueilPage,
    AProposPage,
    ContactPage,
    ServiceCartePage,
    ServiceDetailsPage,
    ServicesPage,
    PanierPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccueilPage,
    AProposPage,
    ContactPage,
    ServiceCartePage,
    ServiceDetailsPage,
    ServicesPage,
    PanierPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BrowserTab,
    DocumentViewer,
    Storage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
