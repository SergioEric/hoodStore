var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FcmProvider } from '../../providers/fcm/fcm';
import { ToastController } from 'ionic-angular';
import { tap } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../services/AuthService';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, fcm, auth, authService, toastCtrl) {
        // this.auth.auth.onAuthStateChanged(user => {
        //   if (user) {
        // this.navCtrl.push(DashPage);
        // this.user = user;
        // } else {
        //   this.rootPage = DashPage;
        //   this.unsubscribe();
        // }
        // });
        this.navCtrl = navCtrl;
        this.fcm = fcm;
        this.auth = auth;
        this.authService = authService;
        this.toastCtrl = toastCtrl;
        fcm.getToken();
        // Listen to incoming messages
        fcm.listenToNotifications().pipe(tap(function (msg) {
            // show a toast
            var toast = toastCtrl.create({
                message: msg.body,
                duration: 3000
            });
            toast.present();
        }))
            .subscribe();
        if (this.user) {
            this.displayName = this.user.displayName;
        }
        else {
            this.displayName = "NO name";
        }
    }
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController,
            FcmProvider,
            AngularFireAuth,
            AuthService,
            ToastController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map