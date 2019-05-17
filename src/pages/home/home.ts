import { Component, ViewChild } from '@angular/core';
import { App, NavController, Platform, Nav } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { AboutUsPage } from '../about-us/about-us';
import { FaqPage } from '../faq/faq';
import { LegalTermsPage } from '../legal-terms/legal-terms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = DashboardPage;
  pages: Array<{title: string, component: any}>

  constructor(public navCtrl: NavController) {
      // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage},
      { title: 'About Us', component:AboutUsPage },
      { title: 'Faq', component: FaqPage },
      { title: 'Legal Terms', component: LegalTermsPage }
    ];
  }

  openPage(page) {  
      this.nav.setRoot(page.component);
  }
  
}
