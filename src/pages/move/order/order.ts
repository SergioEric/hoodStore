import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';

import { SingletonServiceProvider } from '../../../providers/singleton-service/singleton-service';

import Order from '../../../providers/singleton-service/order.model';
import { Observable } from 'rxjs/Observable'


@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
	@ViewChild('myInput') myInput: ElementRef;
  viewOrders:boolean=false
	// order_list:AngularFirestoreCollection<Order>
  items:Observable<Order[]>;

	// order_list:string[]=[]
	name_product:string='';
	amount:number;
	quantity:number;

	month:string;
  constructor(
  	public navCtrl: NavController,
		public navParams: NavParams,
		private toast: Toast,
  	private singleProvider:SingletonServiceProvider,
  	) {
			this.items = this.singleProvider.getOrderCollection()
  }
  resize() {
      let element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
      let scrollHeight = element.scrollHeight;
      element.style.height = scrollHeight + 'px';
      this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }

  addOrder():void{
		if(this.name_product.trim() == '' || this.amount == null || this.quantity == null) return;
		let dt = new Date()
		this.singleProvider.addOrder({
			amount:new Number(this.amount).valueOf(),
			date:dt,
			name_product:this.name_product,
			quantity:new Number(this.quantity).valueOf(),
		}).then(res=>{
			this.toast.show(res, '2000', 'center').subscribe();
			this.amount = null;
			this.name_product = '';
			this.quantity = null;
		}).catch(error=>{
			this.toast.show(error, '2000', 'center').subscribe();
		})
  }
  switchViewOrder(){
    this.viewOrders = !this.viewOrders
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }
}
