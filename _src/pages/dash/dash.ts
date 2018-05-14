import { Component } from '@angular/core';
import { NavController, NavParams, ToastController,AlertController,LoadingController,MenuController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable'


import { AuthService } from '../../services/AuthService';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore,AngularFirestoreDocument } from 'angularfire2/firestore';

import { Camera,CameraOptions } from '@ionic-native/camera';
import { LoginPage } from '../login/login'


@Component({
  selector: 'page-dash',
  templateUrl: 'dash.html',
})
export class DashPage {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  imageURL: any;
  porcentaje: any;

  URL_OK:boolean;

	product_name:string;
	product_cost:string;
	product_description:string;
	product_image_to_upload;

	// private itemDoc: AngularFirestoreDocument;
  // item: Observable<Item>;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
    public menu:MenuController,
    public toast:ToastController,
    public loadingCtrl:LoadingController,
    public alertCtrl:AlertController,
  	private auth:AuthService,
    private storage:AngularFireStorage,
    private camera:Camera,
    private afs:AngularFirestore
  	) {
    menu.enable(true)
  	// this.getImageUrl();
    if(!auth.authenticated()) navCtrl.setRoot(LoginPage)
  }
  showToast(msj:string){
    this.toast.create({
      message:msj,
      position:"top",
      duration:1500,
    }).present()
  }

  presentAlert(msj:string,subtitle:string) {
    let alert = this.alertCtrl.create({
      title: msj,
      subTitle: subtitle,
      buttons: ['Cerrar']
    });
    alert.present();
  }
  // getImageUrl(){
  //   this.imageURL=  this.storage.ref('scotchs').getDownloadURL()
  //   console.log(this.imageURL)
  // }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation:true,
    targetWidth:600,
    targetHeight:400,
    // saveToPhotoAlbum:true
  }
  generateTime():string{
    const date = new Date();
    const time = `${date.getTime()}_${date.getMilliseconds()}_${date.getSeconds()}_${date.getDay()}_${date.getMonth()}`;
    return time;
  }
  async takePhoto(){
    try{
      const result = await this.camera.getPicture(this.options)
      this.product_image_to_upload = `data:image/jpeg;base64,${result}`

      //${new Date().getTime()}_${file.name}
      this.URL_OK = true;
      // this.getImageUrl()
      // console.log(new Date().getDay())
    }catch(e){
      this.presentAlert("ups",e)
    }
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `products-image/${new Date().getTime()}_${file.name}`;
    const task = this.storage.upload(filePath, file);
    
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    this.imageURL = task.downloadURL();
    this.URL_OK = true;
  }

  submitProduct(){
  	if(
			!this.product_name||
			!this.product_cost||
			!this.product_description ){
			this.showToast("campo vacio");
  	}else{
  		if(this.URL_OK != true){
  			this.presentAlert("FOTO","toma una foto o sube una desde la galeria");
  		}else{
			const picture = this.storage.ref(`products-image/${this.generateTime()}`);
      /*initilizated loading*/
      let loading = this.loadingCtrl.create({
        content: 'subiendo producto...'
      });
      loading.present();
      picture.putString(this.product_image_to_upload,'data_url').then(res=>{
      	this.imageURL = res.downloadURL
      	this.porcentaje =`${(res.bytesTransferred)/1024} KB`
      	// alert(this.imageURL)
	      this.afs.collection('products').add({
	      	product_name: this.product_name,
					product_cost: this.product_cost,
					product_description: this.product_description,
					product_image: this.imageURL
	      }).then(doc=>{
          loading.dismiss();
	      	this.showToast("agregado a firebase")
	      }).catch(error=>{
          loading.dismiss();
	      	this.presentAlert("no se subio el Producto",error.message);
	      })
      },error=>{
          loading.dismiss();
          this.presentAlert("no se subio la foto",error.message);
      	return;
      });
  		}
  	}
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DashPage');
  }
}


