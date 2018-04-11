import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage';
import moment from 'moment';

import { ToastController } from 'ionic-angular';

import { AccueilPage } from '../accueil/accueil'
import { PanierPage } from '../panier/panier';
/**
 * Generated class for the ServiceDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-details',
  templateUrl: 'service-details.html',
})
export class ServiceDetailsPage {
  @ViewChild('dateTime') dateTime;
  public myService;
  public serviceId;

  public options;
  public descriptions;

  public optionsChecked;

  public isOptionPerUnitSelected: Array<boolean>;

  public myOptions;
  public mySurfaces;
  public myTimes;
  public myPrices: Array<number>;
  public myQuantities;

  public myChoice;
  public myDate;
  public minDate: Date;
  public minDateString: string;
  public now: Date;
  public nowstr: string

  public myCounter
  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, 
              public navParams: NavParams, 
              public http: Http,
              public toastCtrl: ToastController,
              public storage: Storage) {

                this.myCounter = AccueilPage.notifCounter

    this.options = new Array();
    this.myOptions = new Array<Array<number>>();
    this.optionsChecked = new Array<Array<number>>();
    this.descriptions = new Array();

    this.mySurfaces = new Array();
    this.myPrices = new Array();
    this.myTimes = new Array();
    this.myQuantities = [0, 0]
    this.mySurfaces = [20,20,20]
    this.serviceId = this.navParams.get("serviceId");

    this.isOptionPerUnitSelected = new Array<boolean>();
    this.isOptionPerUnitSelected[0] = false;
    this.isOptionPerUnitSelected[1] = false;

    this.now = new Date(Date.now());
    this.nowstr = moment(this.now.toDateString()).format('YYYY-MM-DD')

    let optionsData = http.get("assets/data/options.json").map(res => res.json().options);
    optionsData.subscribe(
      (data)=>{
        this.options=data;
      }
    )

    let descriptionsData = http.get("assets/data/descriptions.json").map(res => res.json().descriptions);
    descriptionsData.subscribe(
      (data)=>{
        this.descriptions=data;
      }
    )

    let servicesData = http.get("assets/data/services.json").map(res => res.json().services);
    servicesData.subscribe(
      (data)=>{
        this.myService=data[this.serviceId];
        if (this.myService.title == "SOS Parents pas contents"){
          //now + 2h
          console.log("hours: "+this.now.getHours())
          if (this.now.getHours() >= 19){
            console.log("je suis la")
            this.now.setHours(this.now.getHours()+5)
          }
          this.minDateString= moment(this.now.toDateString()).format('YYYY-MM-DDT07:00:00Z')
          console.log(this.minDateString)
        }
        else{
          this.now.setHours(this.now.getHours()+48)
          if (this.now.getHours() >= 19){
            this.now.setHours(this.now.getHours()+5)
          }
          this.minDateString = moment(this.now.toDateString()).format('YYYY-MM-DDT07:00:00Z')
        }

        for (let formule of this.myService.formules){
          this.myPrices.push(formule.hPerSurfaceRange[0] * formule.tarifH)
          this.myTimes.push(formule.hPerSurfaceRange[0])
        }
      }
    )
  }

  ngOnInit(){

  }

  showCheckbox(indexFormule: number) {
    let alert = this.alertCtrl.create({
      title:"Quelle(s) option(s) désirez-vous ?",
      buttons : [{
        text : "Annuler",
        cssClass: "alert-btn",
        handler : data  => {
        }
      }, {
        text : "Confirmer",
        cssClass: "alert-btn",
        handler : (results) => {
          this.myOptions[indexFormule] = new Array()
          this.optionsChecked[indexFormule]= new Array()
          for (let resultId of results){
            if (this.options[resultId].perUnit){
              this.isOptionPerUnitSelected[indexFormule] = true
            }
            this.optionsChecked[indexFormule][resultId] = true
            this.myOptions[indexFormule].push(resultId)
          }
          this.myPrices[indexFormule] = this.computePrice(indexFormule);
          console.log("formule: "+indexFormule+", prix:"+this.myPrices[indexFormule]+"€")
        }
      }],
      cssClass:"myGreen-alert"
    });

    for (let i in this.myService.formules[indexFormule].optionsId){
      if (this.options[this.myService.formules[indexFormule].optionsId[i]].perUnit){
        alert.addInput({
          type: 'checkbox',
          label: this.options[this.myService.formules[indexFormule].optionsId[i]].title + " ("+ this.options[this.myService.formules[indexFormule].optionsId[i]].price +"€/"+this.options[this.myService.formules[indexFormule].optionsId[i]].perUnit+")",
          value: this.myService.formules[indexFormule].optionsId[i],
          checked: this.optionsChecked[indexFormule] ? this.optionsChecked[indexFormule][this.myService.formules[indexFormule].optionsId[i]] : false,
        });
      }
      else{
        alert.addInput({
          type: 'checkbox',
          label: this.options[this.myService.formules[indexFormule].optionsId[i]].title + " ("+ this.options[this.myService.formules[indexFormule].optionsId[i]].price +"€)",
          value: this.myService.formules[indexFormule].optionsId[i],
          checked: this.optionsChecked[indexFormule] ? this.optionsChecked[indexFormule][this.myService.formules[indexFormule].optionsId[i]] : false,
        });
      }
    }
    alert.present();
  }

  showRadio() {
    let alert = this.alertCtrl.create({
      title:"Quelle formule désirez-vous ?",
      buttons : [{
        text : "Annuler",
        cssClass: "alert-btn",
        handler : data  => {
        }
      }, {
        text : "Confirmer",
        cssClass: "alert-btn",
        handler : (result) => {
          this.myChoice = result
        }
      }],
      cssClass:"myGreen-alert"
    });

    for (let i in this.myService.formules){
      alert.addInput({
        type: 'radio',
        label: this.myService.formules[i].title,
        value: i,
        checked: this.myService.formules[this.myChoice] == this.myService.formules[i]? true : false
      });
      alert.present();
    }

  }

  removeOption(optionId, indexFormule, index){
    console.log(this.myOptions[indexFormule])
    this.optionsChecked[indexFormule][this.myOptions[indexFormule][index]] = false;
    this.myOptions[indexFormule].splice(index, 1)
    this.myPrices[indexFormule] = this.computePrice(indexFormule);
    console.log("formule: "+indexFormule+", prix:"+this.myPrices[indexFormule]+"€")
  }

  onKgChange(indexFormule:number){
    this.myPrices[indexFormule] = this.computePrice(indexFormule);
    console.log("formule: "+indexFormule+", prix:"+this.myPrices[indexFormule]+"€")
  }

  saveTheDate(){
    if (this.myDate){
      console.log(this.myDate)
      let date = new Date(this.myDate);
      console.log(date);
      if (this.myChoice){
        let alert = this.alertCtrl.create({
          title:"Enregistrer la date ?",
          message:"Vous êtes sur le point de programmer une intervention.<br><br>Service: "+ this.myService.title +"<br>Formule: "+ this.myService.formules[this.myChoice].title +"<br>Prix Facturé: "+ this.myPrices[this.myChoice] +"€<br>Date d'arrivée: "+this.myDate,
          buttons : [{
            text : "Annuler",
            cssClass: "alert-btn",
            handler : data  => {
            }
          }, {
            text : "Confirmer",
            cssClass: "alert-btn",
            handler : (result) => {
              let toast = this.toastCtrl.create({
                message: "Votre rendez-vous a correctement été enregistré !",
                duration: 3000,
                position: 'bottom'
              })
              toast.present();
              let data = {
                serviceId: this.serviceId,
                formuleId: Number(this.myChoice),
                duration: this.myTimes[this.myChoice],
                startDate: new Date(this.myDate),
                optionsId: this.myOptions[this.myChoice],
                surface: this.mySurfaces[this.myChoice],
                kg: this.myQuantities && this.myQuantities[this.myChoice]? Number(this.myQuantities[this.myChoice]): 0,
              }
              
              this.storage.set(AccueilPage.currentId.toString(), data).then(
                (success)=>{
                  AccueilPage.currentId ++;
                  AccueilPage.notifCounter ++;
                  AccueilPage._data.next(AccueilPage.notifCounter)
                  this.navCtrl.pop();
                }
              ).catch(
                (error)=>{
                  console.log(error)
                }
              )
            }
          }],
          cssClass:"myGreen-alert"
        })
        alert.present()
      }
      else{
        let toast = this.toastCtrl.create({
          message: "Vous n'avez pas choisi votre formule !",
          duration: 3000,
          position: 'bottom'
        })
        toast.present()
      }
    }
    else{
      let toast = this.toastCtrl.create({
        message: "Vous n'avez pas renseigné la date de l'intervention !",
        duration: 3000,
        position: 'bottom'
      })
      toast.present()
    }
  }

  computePrice(indexFormule: number):number{
    let myPrice = 0;
    let mySurface = this.mySurfaces[indexFormule];
    let myTime = this.myTimes[indexFormule];
    let myFormule = this.myService.formules[indexFormule];
    let myOptionsId = this.myOptions[indexFormule]
    
    if (mySurface < 50){
      myTime=myFormule.hPerSurfaceRange[0]
    }
    else if(mySurface < 90){
      myTime=myFormule.hPerSurfaceRange[1]
    }
    else{
      myTime=myFormule.hPerSurfaceRange[2]
    }

    myPrice = myTime * myFormule.tarifH;

    if (myOptionsId && myOptionsId.length > 0){
      for (let myOptionId of myOptionsId){
        if (this.options[myOptionId].perUnit){
          myPrice += Number(this.options[myOptionId].price) * this.myQuantities[indexFormule]
        }
        else{
          myPrice += Number(this.options[myOptionId].price)
        }
      }
    }
    this.myTimes[indexFormule]=myTime;
    return myPrice
  }

  numberToHstring(number: number): string{
    let numberStrParts: Array<string> = String(number).split(".");
    let str = "Pour "+numberStrParts[0]+"h";
    if (numberStrParts.length > 1){
      str += "30"
    }
    return str
  }

  onSurfaceChange(indexFormule: number){
    this.myPrices[indexFormule] = this.computePrice(indexFormule);
    console.log("formule: "+indexFormule+", prix:"+this.myPrices[indexFormule]+"€")
  }

  onDateChange(){

  }

  toggleSection(i) {
    this.myService.formules[i].open = !this.myService.formules[i].open;
    console.log(this.myService.formules[i].open)
  }

  toggleItem(i, j) {
    this.descriptions[j].open = !this.descriptions[j].open;
  }

  goBack(){
    this.navCtrl.pop();
  }

  goToBasket(){
    this.navCtrl.push(PanierPage)
  }

}

export class Order{
  public serviceId: number;
  public formuleId: number;
  public duration: number;
  public startDate: Date;
  public optionsId:Array<number>;
  public surface: number;
  public kg: number;

  constructor(data){
    this.serviceId = data.serviceId;
    this.formuleId = data.formuleId;
    this.duration = data.duration;
    this.startDate = new Date(data.startDate);

    if (data.optionsId){
      for (let optionId of data.optionsId){
        this.optionsId.push(optionId)
      }
    }

    this.surface = data.surface;
    if (data.kg){
      this.kg = data.kg
    }
  }
}
