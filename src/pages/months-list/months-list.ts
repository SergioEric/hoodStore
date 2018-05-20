import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


// import {AngularFireDatabase,AngularFireList} from 'angularfire2/database'
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable'
import { map } from 'rxjs/operators';

import { CreditPage } from '../credit/credit'

interface Months{
  key:string,
  payload:Function,
  query:Function
}

@Component({
  selector: 'page-months-list',
  templateUrl: 'months-list.html',
})
export class MonthsListPage {
  months_list:AngularFirestoreDocument<Months>;
	items=[]//:Observable<any[]>;

  client_id:string;
  list_aux:any=[]

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private afs: AngularFirestore
  	) {

  	this.client_id = navParams.get('id')
    this.months_list = afs.doc(`precios/${this.client_id}`)
  	this.months_list.snapshotChanges().subscribe(actions=>{
      this.list_aux = []
      if(actions.payload.exists){
        actions.payload.data().ArrayOfMonth.map((value)=>{
          this.list_aux.push(value)
          this.items = this.list_aux
        })
      }
    })
  }
  gotoCredit(key):void{
    this.navCtrl.setRoot(CreditPage,{
      client_id:this.client_id,
      month:key
    })
  }
}
