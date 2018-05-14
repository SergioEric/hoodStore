var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
var AuthService = /** @class */ (function () {
    function AuthService(afAuth) {
        var _this = this;
        this.afAuth = afAuth;
        this.authState = null;
        this.afAuth.authState.subscribe(function (auth) {
            _this.authState = auth;
        });
    }
    // Returns true if user is logged in
    AuthService.prototype.authenticated = function () {
        return this.authState !== null;
    };
    // Returns current user data
    AuthService.prototype.currentUser = function () {
        return this.authenticated ? this.authState : null;
    };
    // Returns
    AuthService.prototype.currentUserObservable = function () {
        return this.afAuth.authState;
    };
    // Returns current user UID
    AuthService.prototype.currentUserId = function () {
        return this.authenticated ? this.authState.uid : '';
    };
    // Anonymous User
    AuthService.prototype.currentUserAnonymous = function () {
        return this.authenticated ? this.authState.isAnonymous : false;
    };
    // Returns current user display name or Guest
    AuthService.prototype.currentUserDisplayName = function () {
        if (!this.authState) {
            return 'Guest';
        }
        else if (this.currentUserAnonymous) {
            return 'Anonymous';
        }
        else {
            return this.authState['displayName'] || 'User without a Name';
        }
    };
    //// Social Auth ////
    // githubLogin() {
    //   const provider = new firebase.auth.GithubAuthProvider()
    //   return this.socialSignIn(provider);
    // }
    // googleLogin() {
    //   const provider = new firebase.auth.GoogleAuthProvider()
    //   return this.socialSignIn(provider);
    // }
    // facebookLogin() {
    //   const provider = new firebase.auth.FacebookAuthProvider()
    //   return this.socialSignIn(provider);
    // }
    // twitterLogin(){
    //   const provider = new firebase.auth.TwitterAuthProvider()
    //   return this.socialSignIn(provider);
    // }
    // private socialSignIn(provider) {
    //   return this.afAuth.auth.signInWithPopup(provider)
    //     .then((credential) =>  {
    //         this.authState = credential.user
    //         this.updateUserData()
    //     })
    //     .catch(error => console.log(error));
    // }
    //// Anonymous Auth ////
    AuthService.prototype.anonymousLogin = function () {
        var _this = this;
        return this.afAuth.auth.signInAnonymously()
            .then(function (user) {
            _this.authState = user;
            _this.updateUserData();
        })
            .catch(function (error) { return console.log(error); });
    };
    //// Email/Password Auth ////
    AuthService.prototype.emailSignUp = function (email, password) {
        var _this = this;
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(function (user) {
            _this.authState = user;
            _this.updateUserData();
            console.log("user created");
        })
            .catch(function (error) { return console.log(error.message); });
    };
    AuthService.prototype.emailLogin = function (email, password) {
        var _this = this;
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then(function (user) {
            _this.authState = user;
            _this.updateUserData();
        })
            .catch(function (error) { return console.log(error.message); });
    };
    // Sends email allowing user to reset password
    AuthService.prototype.resetPassword = function (email) {
        var auth = firebase.auth();
        return auth.sendPasswordResetEmail(email)
            .then(function () { return console.log("email sent"); })
            .catch(function (error) { return console.log(error); });
    };
    //// Sign Out ////
    AuthService.prototype.signOut = function () {
        this.afAuth.auth.signOut();
    };
    //// Helpers ////
    AuthService.prototype.updateUserData = function () {
        // Writes user name and email to realtime db
        // useful if your app displays information about users or for admin features
        // let path = `users/${this.currentUserId}`; // Endpoint on firebase
        // let data = {
        //               email: this.authState.email,
        //               name: this.authState.displayName
        //             }
        // this.db.object(path).update(data)
        // .catch(error => console.log(error));
    };
    AuthService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AngularFireAuth])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=AuthService.js.map