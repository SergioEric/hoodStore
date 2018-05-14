import { Component,ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import { DashPage } from '../pages/dash/dash';
import { LoginPage } from '../pages/login/login'
import { AccountPage } from '../pages/account/account'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Dash', component: DashPage },
      { title: 'Account', component: AccountPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#C20013');
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
// @Component({
//   templateUrl: 'app.html'
// })
// export class MyApp {
//   rootPage:any=LoginPage;

//   constructor(
//     platform: Platform, 
//     // statusBar: StatusBar, 
//     splashScreen: SplashScreen,
//     // private auth:AuthService,
//     // private afAuth:AngularFireAuth
//     ) {
//     platform.ready().then(() => {
//       // Okay, so the platform is ready and our plugins are available.
//       // Here you can do any higher level native things you might need.
//       // statusBar.styleDefault();
//       splashScreen.hide();
//        // this.unsubscribe()
//     });
//   }

//   //   unsubscribe(){
//   //     // this.auth.currentUser(user => {
//   //   this.afAuth.auth.onAuthStateChanged(user=>{
//   //     if (!user) {
//   //       this.rootPage = HomePage;
//   //       this.unsubscribe();
//   //     } else {
//   //       this.rootPage = DashPage;
//   //       this.unsubscribe();
//   //     }
//   //   }); 
//   // }
// }

