import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';


@Injectable()
export class AuthService {

  authState: any = null;

  constructor(
    private afAuth: AngularFireAuth,
    public toast:ToastController,
    private storage:Storage,
    ) {
      this.afAuth.authState.subscribe((auth) => {
        this.authState = auth
      });
    }
 showToast(msj:string){
    this.toast.create({
      message:msj,
      position:"top",
      duration:3000,
    }).present()
  }

  // Returns true if user is logged in
  authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  currentUserObservable(): any {
    return this.afAuth.authState
  }

  // Returns current user UID
  currentUserId(): string {
    return this.authenticated ? this.afAuth.auth.currentUser.uid : '';
  }

  // Anonymous User
  currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false
  }

  // Returns current user display name or Guest
  currentUserDisplayName(): string {
    if (!this.authState) { return 'Guest' }
    // else if (this.currentUserAnonymous) { return 'Anonymous' }
    else { return this.authState['displayName'] || 'User without a Name' }
  }
  getUserPhotoURL():string{
    return this.authState['photoURL'] || "https://pbs.twimg.com/profile_images/1395065303/MIQUITO_400x400.jpg"
  }

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
  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
    .then((user) => {
      this.authState = user
      // this.updateUserData()
    })
    .catch(error => console.log(error));
  }

  //// Email/Password Auth ////
  emailSignUp(email:string, password:string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        // this.updateUserData()
         console.log("user created")
      })
      .catch(error =>this.showToast(error.message));
  }

  emailLogin(email:string, password:string) {
     this.afAuth.auth.signInWithEmailAndPassword(email, password)
       .then((user) => {
         this.authState = user
         // this.updateUserData()
       })
       .catch(error => this.showToast(error.message));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    var auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }


  //// Sign Out ////
  signOut(): void {
    this.afAuth.auth.signOut();
    this.storage.remove('username');
    // this.navCtrl.setRoot(HomePage)
  }


  //// Helpers ////
  updateUserData(name,url): void {
  // Writes user name and email to realtime db
  // useful if your app displays information about users or for admin features
    // let path = `users/${this.currentUserId}`; // Endpoint on firebase
    // let data = {
    //               email: this.authState.email,
    //               name: this.authState.displayName
    //             }

    // this.db.object(path).update(data)
    // .catch(error => console.log(error));
 
      this.afAuth.auth.currentUser.updateProfile(
        {
          displayName:name,
          photoURL:url
      }).then(res=>{
        // alert(`Perfil actualizado ${res.displayName}`)
        this.showToast("se actualizo el perfil")
        this.storage.remove('username');
        this.storage.set('username', name);
        console.log(res)
      }).catch(error=>{
        this.showToast(`No se pudo actualizar el perfil ${error.message}`);
      })
    }
}