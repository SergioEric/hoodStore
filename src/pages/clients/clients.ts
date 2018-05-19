import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {AngularFireDatabase,AngularFireList} from 'angularfire2/database'
import { Observable } from 'rxjs/Observable'

import { DetailClientPage } from '../detail-client/detail-client'

interface Client{
	name:string,
	phone:string,
	address:string
}
interface ClientID extends Client{
  key:string
}

@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html'
})
export class ClientPage {

  client_list:AngularFireList<Client>;
	clients: Observable<ClientID[]>
	name:string;
	phone:string;
	address:string;

  constructor(public navCtrl: NavController, private afDB:AngularFireDatabase) {
    this.client_list = afDB.list<Client>('clients')
  	this.clients = this.client_list.snapshotChanges().map(actions=>{
  		return actions.map(action => ({key: action.key, ...action.payload.val()}));
  	})
  }

  addClient():void{
  	this.client_list.push({
			name : this.name,
			phone : this.phone,
			address : this.address
  	})
  }

  gotoClient(key):void{
    let snap_client = this.afDB.object(`clients/${key}`)
  	this.navCtrl.push(DetailClientPage,{client:snap_client})
  }

}
