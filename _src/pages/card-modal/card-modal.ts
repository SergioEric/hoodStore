import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the CardModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-card-modal',
  templateUrl: 'card-modal.html',
})
export class CardModalPage {

	list_products:any;
	total_to_pay:number;
	empty:boolean=false;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public viewCtrl:ViewController,
  	) {
  	let data = navParams.get('data');
  	this.list_products = data;
  	let num=0;
  	// debugger;
  	data.map(v=>{
  		num+=(new Number(v.amount).valueOf()) * (new Number(v.p.product_cost).valueOf())
  		// debugger;
  	})
  	this.total_to_pay = num;
  	console.log(navParams.get('data'));
  	// console.log(`total: ${this.total_to_pay}`);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardModalPage');
  }
  dismiss(){
  	this.viewCtrl.dismiss({delete:this.empty});
  }
  deleteCartList(){
  	this.list_products=[]
  	this.total_to_pay=0;
  	this.empty = true;
  }

}
