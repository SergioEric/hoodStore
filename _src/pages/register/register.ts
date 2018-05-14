import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { AuthService } from '../../services/AuthService';

import { LoginPage } from '../login/login'
import { HomePage } from '../home/home'

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  email:string="";
  password:string="";

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private auth:AuthService
  	) {
  	// if(!auth.authenticated()) navCtrl.setRoot(LoginPage)
		// else navCtrl.setRoot(HomePage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  handleRegister(){
    if(this.email.trim() == "" || this.password.trim()==""){ return;}
    this.auth.emailSignUp(this.email,this.password);
  }

}
