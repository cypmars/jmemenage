import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccueilPage } from '../accueil/accueil'

/**
 * Generated class for the AProposPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-a-propos',
  templateUrl: 'a-propos.html',
})
export class AProposPage {
  public myCounter

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.myCounter = AccueilPage.notifCounter
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AProposPage');
  }

}
