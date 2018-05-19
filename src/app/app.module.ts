import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ClientPage } from '../pages/clients/clients';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CreditPage } from '../pages/credit/credit';
import { DetailCreditPage } from '../pages/detail-credit/detail-credit'
import { DetailClientPage } from '../pages/detail-client/detail-client'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2'

import {AngularFireDatabase,AngularFireDatabaseModule} from 'angularfire2/database'
// native plugins
import { Dialogs } from '@ionic-native/dialogs';
import { Toast } from '@ionic-native/toast';
import { CallNumber } from '@ionic-native/call-number';



const config = {
  apiKey: "AIzaSyBdTfPhNExNeNCOrcoJs2plOPqsZQ_OLrc",
  authDomain: "hoodstore-b978d.firebaseapp.com",
  databaseURL: "https://hoodstore-b978d.firebaseio.com",
  projectId: "hoodstore-b978d",
  storageBucket: "",
  messagingSenderId: "725103906741"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ClientPage,
    HomePage,
    TabsPage,
    CreditPage,
    DetailCreditPage,
    DetailClientPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ClientPage,
    HomePage,
    TabsPage,
    CreditPage,
    DetailCreditPage,
    DetailClientPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    AngularFireDatabaseModule,
    Dialogs,
    Toast,
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
