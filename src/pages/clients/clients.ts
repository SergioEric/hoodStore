import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {AngularFireDatabase,AngularFireList} from 'angularfire2/database'
import { Observable } from 'rxjs/Observable'

interface Client{
	name:string,
	phone:string,
	address:string
}

@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html'
})
export class ClientPage {

	clients: Observable<Client[]>
	one_client:AngularFireList<Client>;
	name:string
	phone:string
	address:string

  constructor(public navCtrl: NavController, private afDB:AngularFireDatabase) {
  	this.one_client = afDB.list('clients')
  	this.clients = afDB.list('clients').snapshotChanges().map(actions=>{
  		return actions.map(action => ({key: action.key, ...action.payload.val()}));
  	})
  }

  addClient():void{
  	this.one_client.push({
			name : this.name,
			phone : this.phone,
			address : this.address
  	})
  }

  gotoCredit(key):void{
  	alert(key)
  }

}
