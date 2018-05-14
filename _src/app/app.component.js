var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { DashPage } from '../pages/dash/dash';
import { LoginPage } from '../pages/login/login';
import { AccountPage } from '../pages/account/account';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = LoginPage;
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: HomePage },
            { title: 'Dash', component: DashPage },
            // { title: 'Login', component: LoginPage },
            { title: 'Account', component: AccountPage },
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
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
//# sourceMappingURL=app.component.js.map