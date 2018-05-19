import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {AngularFireDatabase,AngularFireList} from 'angularfire2/database'
import { Observable } from 'rxjs/Observable'
import { Toast } from '@ionic-native/toast';

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
	name:string='';
	phone:string='';
	address:string='';

  constructor(
    public navCtrl: NavController,
    private afDB:AngularFireDatabase,
    private toast:Toast
    ) {
    this.client_list = afDB.list<Client>('clients')
  	this.clients = this.client_list.snapshotChanges().map(actions=>{
  		return actions.map(action => ({key: action.key, ...action.payload.val()}));
  	})
  }

  addClient():void{
    if(this.name.trim() ==="" || this.phone.trim() ==="" || this.address.trim() ==="" ) return;
  	this.client_list.push({
			name : this.name,
			phone : this.phone,
			address : this.address
  	}).then(()=>{
      this.name = ""
      this.phone = ""
      this.address = ""
      this.toast.show(`Cliente Agregado`, '2000', 'center').subscribe()
    })
  }

  gotoClient(key):void{
    let snap_client = this.afDB.object(`clients/${key}`)
  	this.navCtrl.push(DetailClientPage,{client:snap_client})
  }

}
