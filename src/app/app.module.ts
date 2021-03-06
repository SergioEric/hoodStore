import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { MovePage } from '../pages/move/move';
import { ClientPage } from '../pages/clients/clients';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CreditPage } from '../pages/credit/credit';
import { DetailCreditPage } from '../pages/detail-credit/detail-credit';
import { DetailClientPage } from '../pages/detail-client/detail-client';
import { MonthsListPage } from '../pages/months-list/months-list';
import { MonthStatePage } from '../pages/month-state/month-state';
import { OrderPage } from '../pages/move/order/order';
import { BitMovePage } from '../pages/move/bit-move/bit-move'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';

import {AngularFireDatabase,AngularFireDatabaseModule} from 'angularfire2/database';
// native plugins
import { Dialogs } from '@ionic-native/dialogs';
import { Toast } from '@ionic-native/toast';
import { CallNumber } from '@ionic-native/call-number';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FacadeServiceProvider } from '../providers/facade-service/facade-service';
import { SingletonServiceProvider } from '../providers/singleton-service/singleton-service';

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
    MovePage,
    ClientPage,
    HomePage,
    TabsPage,
    CreditPage,
    DetailCreditPage,
    DetailClientPage,
    MonthsListPage,
    MonthStatePage,
    OrderPage,
    BitMovePage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    IonicModule.forRoot(MyApp),
    AngularFirestoreModule.enablePersistence()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MovePage,
    ClientPage,
    HomePage,
    TabsPage,
    CreditPage,
    DetailCreditPage,
    DetailClientPage,
    MonthsListPage,
    MonthStatePage,
    OrderPage,
    BitMovePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    Dialogs,
    Toast,
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FacadeServiceProvider,
    SingletonServiceProvider
  ]
})
export class AppModule {}
