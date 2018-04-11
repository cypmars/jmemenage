import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Order } from '../service-details/service-details';
import { AccueilPage } from '../accueil/accueil';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PanierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-panier',
  templateUrl: 'panier.html',
})
export class PanierPage {
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage: Storage) {
  }

  ngOnInit(){
    let articles: Array<Order>;
    console.log("ngOnInit PanierPage")
    console.log(AccueilPage.currentId)
    AccueilPage.notifCounter = 0;
    AccueilPage._data.next(AccueilPage.notifCounter)
    for (let j = 0; j < AccueilPage.currentId; j++){
      this.storage.get(j.toString()).then(
        (result)=>{
          console.log("result: ", result)
          let order = new Order(result);
          articles.push(order)
        },
        (error)=>{
          console.log(error)
        }
      ).catch(
        (error)=>{
          console.log(error)
        }
      )
    }
  }

  goToBasket(){

  }

}
