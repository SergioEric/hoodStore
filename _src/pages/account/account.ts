import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

import { Camera,CameraOptions } from '@ionic-native/camera';
import { AngularFireStorage } from 'angularfire2/storage';
import { Storage } from '@ionic/storage';


import { AuthService } from '../../services/AuthService';
import { LoginPage } from '../login/login'
import { HomePage } from '../home/home'

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  name:string="";
  photo_url:string;
  image_data_url:string;
  username:string;
  showEdit:boolean=false;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public menu:MenuController,
  	private auth:AuthService,
    private camera:Camera,
    private afs:AngularFireStorage,
    private storage:Storage
  	) {
    menu.enable(true)
    if(!auth.authenticated()) navCtrl.setRoot(LoginPage)
    else this.image_data_url = auth.getUserPhotoURL();
    storage.get('username').then(val=>{
      this.username = val;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');   
  }
  onClickEditInfo(){
    this.showEdit = !this.showEdit;
  }
   options:CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation:true,
    targetWidth:400,
    targetHeight:400,
    // saveToPhotoAlbum:true
  }
  async takePhoto(){
    try{
      const result = await this.camera.getPicture(this.options)
      const data_img = `data:image/jpeg;base64,${result}`
//this.auth.currentUserId
      //alert(this.auth.currentUserId())
      const picture = this.afs.ref(`user_profile_photos/${this.auth.currentUserId()}`);
      picture.putString(data_img,'data_url').then(res=>{
        this.image_data_url = res.downloadURL;
        this.auth.updateUserData(this.username,res.downloadURL);
      }).catch(e=>{
        alert(`No se pudo subir la foto: ${e.message}`)
      })

    }catch(e){
      alert(e)
    }
  }
  changeInfo(){
    if(this.name.trim() != "")
      {
        debugger;
        this.auth.updateUserData(this.name,this.image_data_url);}
  }  

  logout(){
  	this.auth.signOut();
    this.navCtrl.setRoot(HomePage)
  }
}
