import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicesPage } from './services';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    ServicesPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicesPage),
    IonicStorageModule.forRoot()
  ],
})
export class ServicesPageModule {}
