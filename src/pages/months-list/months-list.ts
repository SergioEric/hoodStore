import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import {AngularFireDatabase,AngularFireList} from 'angularfire2/database'
import { Observable } from 'rxjs/Observable'

import { CreditPage } from '../credit/credit'

interface Months{
  key:string,
  payload:Function
}

@Component({
  selector: 'page-months-list',
  templateUrl: 'months-list.html',
})
export class MonthsListPage {
  months_list:AngularFireList<Months>
	items:Observable<any[]>;

  client_id:string;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private afDB: AngularFireDatabase,
  	) {

  	this.client_id = navParams.get('id')
    this.months_list = afDB.list(`precios/${this.client_id}`)
  	this.items = this.months_list.snapshotChanges().map(snapShots=>{
      //lista dentro de la referencia
  		return snapShots.map(doc=>{
        //para cada documento dentro la lista
        return {
          key: doc.key, ...doc.payload.val()
        }
  		})

  	})
  }
  gotoCredit(key):void{
    this.navCtrl.setRoot(CreditPage,{
      client_id:this.client_id,
      month:key
    })
  }
}
