import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AboutUsPage } from '../pages/about-us/about-us';
import { CityActivityPage } from '../pages/city-activity/city-activity';
import { FaqPage } from '../pages/faq/faq';
import { LegalTermsPage } from '../pages/legal-terms/legal-terms';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { MediaCapture } from '@ionic-native/media-capture';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { IonicStorageModule } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { Media } from '@ionic-native/media';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DashboardPage,
    AboutUsPage,
    CityActivityPage,
    FaqPage,
    LegalTermsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DashboardPage,
    AboutUsPage,
    CityActivityPage,
    FaqPage,
    LegalTermsPage
  ],
  providers: [
    StatusBar,
    ImagePicker,
    Camera,
    MediaCapture,
    FilePath,
    StreamingMedia,
    SplashScreen,
    File,
    Media,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
