import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccueilPage } from '../accueil/accueil'
import { ServiceDetailsPage } from '../service-details/service-details'
/**
 * Generated class for the ServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {

  public services;
  public myCounter;
  constructor(public navCtrl: NavController, public navParams: NavParams, http: Http) {
    this.myCounter = AccueilPage.notifCounter
    this.services= new Array();
    let servicesData = http.get("assets/data/services.json").map(res => res.json().services);
    servicesData.subscribe(
      (data)=>{
        this.services=data
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesPage');
  }

  goToServiceDetails(index: number){
    this.navCtrl.push(ServiceDetailsPage, {
      serviceId: index
    })
  }

}
