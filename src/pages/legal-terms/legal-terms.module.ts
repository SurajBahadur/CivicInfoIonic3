import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LegalTermsPage } from './legal-terms';

@NgModule({
  declarations: [
    LegalTermsPage,
  ],
  imports: [
    IonicPageModule.forChild(LegalTermsPage),
  ],
})
export class LegalTermsPageModule {}
