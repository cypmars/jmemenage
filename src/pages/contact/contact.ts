import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AccueilPage } from '../accueil/accueil'
import { PanierPage } from '../panier/panier';
/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  public fullname
  public email
  public message
  public myCounter
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController) {

                this.myCounter = AccueilPage.notifCounter;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  sendMessage(){
    if (this.fullname){
      if (this.email){
        if (this.message){
          this.message = ""
          let toast = this.toastCtrl.create({
            message: "Votre message nous a été correctement envoyé",
            duration: 3000,
            position: 'bottom'
          })
          toast.present()
        }
        else{
          let toast = this.toastCtrl.create({
            message: "Votre message est vide !",
            duration: 3000,
            position: 'bottom'
          })
          toast.present()
        }
      }
      else{
        let toast = this.toastCtrl.create({
          message: "Vous devez renseigner votre email !",
          duration: 3000,
          position: 'bottom'
        })
        toast.present()
      }
    }
    else{
      let toast = this.toastCtrl.create({
        message: "Vous devez renseigner Votre nom et prénom",
        duration: 3000,
        position: 'bottom'
      })
      toast.present()
    }
  }

  goToBasket(){
    this.navCtrl.push(PanierPage)
  }
  
  
}
