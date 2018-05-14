import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ClientPage } from '../pages/clients/clients';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CreditPage } from '../pages/credit/credit';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'

import {AngularFireDatabase} from 'angularfire2/database'

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
    CreditPage
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
    CreditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
