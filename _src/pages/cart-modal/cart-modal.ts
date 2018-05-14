import { Component } from '@angular/core';
import { NavController, NavParams,ViewController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';


interface Items {
  product_name: number,
  product_cost: string,
  product_description: number,
  product_image: number,
}
interface ItemId extends Items{ id:string }

@Component({
  selector: 'page-cart-modal',
  templateUrl: 'cart-modal.html',
})
export class CartModalPage {

  cartList:any=[];
  product;
  quantity:number=0;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public viewCtrl: ViewController,
  	public toast:ToastController
  	) {
  	console.log(this.cartList);
  	console.log('product', navParams.get('product'));
  	this.product = navParams.get('product');
  	this.cartList.push(this.product);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartModalPage');
  }

 	dismiss() {
 		let data = { quantity: this.quantity };
 		if(this.quantity==0) this.showToast("No se agrego al carrito")
 		else 	this.showToast("Se agrego al carrito")
 		this.viewCtrl.dismiss(data);
	}
	showToast(msj:string){
		this.toast.create({
			message:msj,
			position:"top",
			duration:1500,
		}).present()
	}
}
