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
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/AuthService';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, authService, auth) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.auth = auth;
        this.auth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.navCtrl.push(HomePage);
                _this.user = user;
            } //else {
            //   this.rootPage = DashPage;
            //   this.unsubscribe();
            // }
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.handleLogin = function () {
        if (this.email.trim() == "" || this.password.trim() == "") {
            return;
        }
        // this.auth.auth.signInWithEmailAndPassword("","").then(user=>{
        // });
        this.authService.emailLogin(this.email, this.password);
        // alert(`${this.email}- ${this.password}`)
    };
    LoginPage.prototype.handleRegister = function () {
        if (this.email.trim() == "" || this.password.trim() == "") {
            return;
        }
        this.authService.emailSignUp(this.email, this.password);
    };
    LoginPage = __decorate([
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AuthService,
            AngularFireAuth])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map