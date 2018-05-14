import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DashPage } from '../pages/dash/dash';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AccountPage } from '../pages/account/account';
import { CartModalPage } from '../pages/cart-modal/cart-modal';
import { CardModalPage } from '../pages/card-modal/card-modal';


import { Firebase } from '@ionic-native/firebase';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule  } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FcmProvider } from '../providers/fcm/fcm';
import { AuthService } from '../services/AuthService';


/* STORAGE*/
import { AngularFireStorageModule } from 'angularfire2/storage';
import { Camera } from '@ionic-native/camera'

let config = {
  apiKey: "AIzaSyBm993zH29izWygBvdQiAT-OZYQCjzYwIU",
  authDomain: "database-fire.firebaseapp.com",
  databaseURL: "https://database-fire.firebaseio.com",
  projectId: "database-fire",
  storageBucket: "database-fire.appspot.com",
  messagingSenderId: "446997265396"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DashPage,
    LoginPage,
    RegisterPage,
    AccountPage,
    CartModalPage,
    CardModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule.enablePersistence(),
    IonicStorageModule.forRoot({ name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']}),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DashPage,
    LoginPage,
    RegisterPage,
    AccountPage,
    CartModalPage,
    CardModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    Firebase,
    FcmProvider,
    AuthService
  ]
})
export class AppModule {}
