import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map'
import { Http } from '@angular/http';

import { ServiceCartePage } from '../service-carte/service-carte'
import { ServiceDetailsPage } from '../service-details/service-details'

@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html'
})
export class AccueilPage {


  public services;

  constructor(public navCtrl: NavController, http: Http) {

    this.services = new Array();

    let servicesData = http.get("assets/data/services.json").map(res => res.json().services);
    servicesData.subscribe(
      (data)=>{
        this.services=data
      }
    )
  }

  public toServiceCartePage(){
    this.navCtrl.push(ServiceCartePage)
  }

  public goToPage(index: number){
    this.navCtrl.push(ServiceDetailsPage, {
      serviceId: index
    })
  }

}
