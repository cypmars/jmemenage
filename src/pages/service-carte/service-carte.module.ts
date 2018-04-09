import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceCartePage } from './service-carte';

@NgModule({
  declarations: [
    ServiceCartePage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceCartePage),
  ],
})
export class ServiceCartePageModule {}
