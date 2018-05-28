import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable'


import { Toast } from '@ionic-native/toast';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-month-state',
  templateUrl: 'month-state.html',
})
export class MonthStatePage {
	total:Observable<any>;
	month_obj={
    pay:[{
      value:0,
      date: new Date()
    }],
    paid:false
  }
  ref:string;
  toggle_pay:false;
  pay:number;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   private afs:AngularFirestore,
   public toast:Toast,
   public alertCtrl: AlertController
   ) {
  	let snap_month = navParams.get('month')
  	this.ref = navParams.get('ref')
  	this.total = navParams.get('total')
  	snap_month.snapshotChanges().subscribe(action=>{
  		if(action.payload.exists){
	  		// this.month_obj   action.payload.data()
	  		// action.payload.data().pay.map((v)=>console.log(v))
	  		this.month_obj.pay = action.payload.data().pay
	  		this.month_obj.paid = action.payload.data().paid
	  		// debugger
  		}
		})
  }


  payMonth(){
  	this.afs.doc(this.ref).update({
  		paid:true
  	}).then(()=>{
  		this.toast.show(`Se ha cambiado el estado a pagado`, '3000', 'center').subscribe();
  	}).catch(error=>{
  		alert(error)
  	})
  }
  addAmount(){
  	if(this.pay == null) return;
  	this.month_obj.pay.push({
      value:this.pay,
      date: new Date()
  	})
  	this.afs.doc(this.ref).update(this.month_obj)

  	this.pay=null
  }

 	showPrompt() {
 		if(this.month_obj.paid == true) return;
    let prompt = this.alertCtrl.create({
      title: 'Cancelar Mes',
      message: "Para establecer como cancelado el mes, escribi 'Si' debajo, sin las comillas",
      inputs: [
        {
          name: 'valueText',
          placeholder: 'Si'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            console.log('Saved clicked');
            if(data.valueText === "Si"){
            	this.payMonth()
            }else{
            	this.toast.show(`Debes escribir "Si" para cancelar el mes`, '3000', 'center').subscribe();
            }
          }
        }
      ]
    });
    prompt.present();
  }

  ionViewDidLoad() {
  }

}
