import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map'
import { Http } from '@angular/http';

import { ServiceCartePage } from '../service-carte/service-carte'
import { ServiceDetailsPage } from '../service-details/service-details'

import { Storage } from '@ionic/storage';

import { Order } from '../service-details/service-details'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html'
})
export class AccueilPage {


  public services;
  public myCounter;

  public static obsNotifCounter: Observable<number>
  public static notifCounter;
  public static currentId = 0;

  constructor(public navCtrl: NavController, public http: Http, private storage: Storage) {
    this.myCounter = AccueilPage.notifCounter;
    console.log(this.myCounter)
    this.services = new Array();
  }

  ngOnInit(){

      // AccueilPage.obsNotifCounter = this.myCounter.asObservable()
      AccueilPage.notifCounter = Observable.create(observer => {
        AccueilPage.obsNotifCounter = observer;
      });

      AccueilPage.obsNotifCounter.subscribe(
        (counter: number)=>{
          AccueilPage.notifCounter = counter
          this.myCounter = counter;
        }
      )
      // TO DO
      //Local Storage récuperation prestas, boucle sur les prestas pour connaitre le nombre de non vus
      // AccueilPage.notifCounter = 
      let response: Array<Order>
      for (let j = 0; j < AccueilPage.currentId - 1; j++){
        this.storage.get(j.toString()).then(
          (response)=>{
            let order = new Order(response);
            console.log("response", response)
            response.push(order)
          }
        ).catch(
          (error)=>{
            console.log(error);
          }
        )
      }
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

}
