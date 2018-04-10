import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the ServiceCartePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-carte',
  templateUrl: 'service-carte.html',
})
export class ServiceCartePage {

  public fullname;
  public address;
  public email;
  public object;
  public description;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceCartePage');
  }

  sendDemande(){
    if (this.fullname){
      if (this.address){
        if (this.email){
          if (this.object){
            if (this.description.length){
              this.fullname = ""
              this.address = ""
              this.email = ""
              this.object = ""
              this.description = ""
              let toast = this.toastCtrl.create({
                message: "Votre demande va être traitée. Nous vous recontacterons bientôt",
                duration: 3000,
                position: 'bottom'
              })
              toast.present()
            }
            else{
              let toast = this.toastCtrl.create({
                message: "Vous n'avez pas décrit votre demande !",
                duration: 3000,
                position: 'bottom'
              })
              toast.present()
            }
          }
          else{
            let toast = this.toastCtrl.create({
              message: "Vous devez renseigner l'objet de la demande !",
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
          message: "Vous devez renseigner votre adresse !",
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

}
