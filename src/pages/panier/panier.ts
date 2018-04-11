import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Order } from '../service-details/service-details';
import { AccueilPage } from '../accueil/accueil';
import { Storage } from '@ionic/storage';

import { Http } from '@angular/http'

import { Observable } from 'rxjs/Observable';

import moment from 'moment';
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

  public counterOrder;
  
  public options;
  public descriptions;
  public services;

  public creationDateStr: Array<string>
  public startDateStr: Array<string>
  public durationStr: Array<string>
  public articles: Array<Order>;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage: Storage,
              public http:Http) {

                this.counterOrder = AccueilPage.currentId;
                this.articles = new Array<Order>();
                this.options = new Array();
                this.descriptions= new Array();
                this.services = new Array();

                this.creationDateStr = new Array();
                this.startDateStr = new Array();
                this.durationStr = new Array();

                if (AccueilPage.currentId > 0){
                  for (let j = 0; j < AccueilPage.currentId; j++){
                    this.storage.get(j.toString()).then(
                      (result)=>{
                        let order = new Order(result);
                        console.log("order:", order)
                        order.open = false;
                        this.articles.push(order);
                        console.log("la ?", this.articles)
                        if (j == AccueilPage.currentId - 1){
                          console.log("aussi ?")
                          this.articles.sort(
                            (a: Order, b: Order) => {
                              if (a.creationDate.getTime() < b.creationDate.getTime())
                                return -1;
                              else if (a.creationDate == b.creationDate)
                                return 0;
                              else
                                return 1;
                            }
                          )
                          this.articles[0].open = true;
                          for (let article of this.articles){
                            let parts = article.duration.toString().split('.');
                            let durStr = parts[0]+'h'
                            if (parts.length > 0){
                              for (let i in parts){
                                if (Number(i) != 0){
                                  durStr += '30min'
                                }
                              }
                            }
                            this.durationStr.push(durStr)

                            let creationStr = moment(article.creationDate.toDateString()).format('DD/MM/YYYY à HH:mm')
                            this.creationDateStr.push(creationStr)

                            let startStr = moment(article.startDate.toDateString()).format('DD/MM/YYYY à HH:mm')
                            this.startDateStr.push(startStr)
                          }
                        }
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
  }

  ngOnInit(){

    let optionsData = this.http.get("assets/data/options.json").map(res => res.json().options);
    optionsData.subscribe(
      (data)=>{
        this.options=data;
      }
    )

    let descriptionsData = this.http.get("assets/data/descriptions.json").map(res => res.json().descriptions);
    descriptionsData.subscribe(
      (data)=>{
        this.descriptions=data;
      }
    )

    let servicesData = this.http.get("assets/data/services.json").map(res => res.json().services);
    servicesData.subscribe(
      (data)=>{
        this.services = data
      }
    )
  }

  goBack(){
    this.navCtrl.pop()
  }

  toggleSection(i) {
    this.articles[i].open = !this.articles[i].open;
    console.log(this.articles[i].open)
  }


}
