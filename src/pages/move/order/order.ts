import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable'

import * as moment from 'moment'

interface Order {
	amount: number ,
	date: Date,
	name_product:string ,
	quantity: number
}

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
	@ViewChild('myInput') myInput: ElementRef;
  viewOrders:boolean=false
	order_list:AngularFirestoreCollection<Order>
  items:Observable<Order[]>;

	// order_list:string[]=[]
	name_product:string='';
	amount:number;
	quantity:number;

	month:string;
  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private afs:AngularFirestore
  	) {
	    this.month = moment().format("MMM Do YY").split(' ')[0]
	  	this.order_list = afs.collection<Order>('order')
      this.items = this.order_list.snapshotChanges().map(actions=>{
        return actions.map(doc=>{
          return {
            key: doc.payload.doc.id, ...doc.payload.doc.data() as Order
          }
        })
      })
  }
  // pushProductNameToList(){
  // 	if(this.name_product.trim() == '') return;
  // 	this.order_list.push(this.name_product)

  // 	this.name_product = ''
  // }
   resize() {
      let element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
      let scrollHeight = element.scrollHeight;
      element.style.height = scrollHeight + 'px';
      this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }

  addOrder():void{
  	if(this.name_product.trim() == '' || this.amount == null || this.quantity == null) return;
  	let id = this.afs.createId()
  	let dt = new Date()
  	this.order_list.add({
  		// order_list:this.order_list,
			amount:new Number(this.amount).valueOf(),
			date:dt,
			name_product:this.name_product,
			quantity:new Number(this.quantity).valueOf(),
  	}).then(()=>{
  		alert(`order con id: ${id} agregada`)
				this.amount = null;
				this.name_product = '';
				this.quantity = null;
  	}).catch(error=>{
  		alert(error)
  	})
  }
  switchViewOrder(){
    this.viewOrders = !this.viewOrders
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }
}
