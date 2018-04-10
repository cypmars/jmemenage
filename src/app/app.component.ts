import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AccueilPage } from '../pages/accueil/accueil';
import { AProposPage } from '../pages/a-propos/a-propos';
import { ContactPage } from '../pages/contact/contact';
import { ServiceCartePage } from '../pages/service-carte/service-carte';
import { ServicesPage } from '../pages/services/services';
import { BrowserTab } from '@ionic-native/browser-tab';

import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AccueilPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private browserTab: BrowserTab, private documentViewer: DocumentViewer) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Accueil', component: AccueilPage },
      { title: 'À Propos', component: AProposPage },
      { title: 'Nos Services', component: ServicesPage },
      { title: 'Service à la carte', component: ServiceCartePage },
      { title: 'Nous contacter', component: ContactPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openMentions(){
    const options: DocumentViewerOptions = {
      title: 'Conditions Générales de prestation de services'
    }
    
    this.documentViewer.viewDocument('assets/mentions.pdf', 'application/pdf', options)
  }

  openQuestions(){
    const options: DocumentViewerOptions = {
      title: 'Questions Fréquentes'
    }
    
    this.documentViewer.viewDocument('assets/questions.pdf', 'application/pdf', options)
  }
}
