import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { AuthService } from '../../services/AuthService';
import { AngularFireAuth } from 'angularfire2/auth';

import { DashPage } from '../dash/dash';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email:string="";
  password:string="";
  user:any;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private authService:AuthService,
  	private auth:AngularFireAuth,
    public toast:ToastController
  	) {
    this.auth.auth.onAuthStateChanged(user => {
      if (user) {
        this.navCtrl.setRoot(HomePage);
        this.user = user;
      } //else {
      //   this.rootPage = DashPage;
      //   this.unsubscribe();
      // }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  showToast(msj:string){
    this.toast.create({
      message:msj,
      position:"top",
      duration:1500,
    }).present()
  }

  handleLogin(){
    if(this.email.trim() == "" || this.password.trim()==""){ return;}
    // this.auth.auth.signInWithEmailAndPassword("","").then(user=>{
    // });
    this.authService.emailLogin(this.email,this.password)
    if(this.auth.auth.currentUser){
      this.navCtrl.setRoot(HomePage);
    }
    // alert(`${this.email}- ${this.password}`)
  }
  handleRegister(){
    this.navCtrl.push(RegisterPage)
  }

}
