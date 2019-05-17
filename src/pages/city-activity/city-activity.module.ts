import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CityActivityPage } from './city-activity';

@NgModule({
  declarations: [
    CityActivityPage,
  ],
  imports: [
    IonicPageModule.forChild(CityActivityPage),
  ],
})
export class CityActivityPageModule {}
