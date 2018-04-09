import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { AccueilPage } from '../pages/accueil/accueil';
import { AProposPage } from '../pages/a-propos/a-propos';
import { ContactPage } from '../pages/contact/contact';
import { QuestionsPage } from '../pages/questions/questions';
import { ServiceCartePage } from '../pages/service-carte/service-carte';
import { ServiceDetailsPage } from '../pages/service-details/service-details';
import { ServicesPage } from '../pages/services/services';

import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BrowserTab } from '@ionic-native/browser-tab';

@NgModule({
  declarations: [
    MyApp,
    AccueilPage,
    AProposPage,
    ContactPage,
    QuestionsPage,
    ServiceCartePage,
    ServiceDetailsPage,
    ServicesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccueilPage,
    AProposPage,
    ContactPage,
    QuestionsPage,
    ServiceCartePage,
    ServiceDetailsPage,
    ServicesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BrowserTab,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
