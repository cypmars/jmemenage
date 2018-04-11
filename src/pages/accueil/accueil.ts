import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

import { ServiceCartePage } from '../service-carte/service-carte'
import { ServiceDetailsPage } from '../service-details/service-details'

import { Storage } from '@ionic/storage';

import { Order } from '../service-details/service-details'

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PanierPage } from '../panier/panier';

@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html'
})
export class AccueilPage {


  public services;
  public myCounter;

  public static _data: BehaviorSubject<number>
  public static obsNotifCounter: Observable<number>
  public static notifCounter = null;

  public static currentId = 0;

  constructor(public navCtrl: NavController, public http: Http, private storage: Storage) {

    AccueilPage._data = new BehaviorSubject(0)
    AccueilPage.obsNotifCounter = AccueilPage._data.asObservable()


    console.log(this.myCounter)
    this.services = new Array();
  }

  ngOnInit(){

      // AccueilPage.obsNotifCounter = this.myCounter.asObservable()
      AccueilPage.obsNotifCounter.subscribe(
        (counter)=>{
          AccueilPage.notifCounter = counter;
          this.myCounter = counter
        }
      )
      // TO DO
      //Local Storage récuperation prestas, boucle sur les prestas pour connaitre le nombre de non vus
      // AccueilPage.notifCounter = 
      
      let servicesData = this.http.get("assets/data/services.json").map(res => res.json().services);
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

  goToBasket(){
    this.navCtrl.push(PanierPage)
  }

}
