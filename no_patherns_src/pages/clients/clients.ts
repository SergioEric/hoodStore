import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable'
import { Toast } from '@ionic-native/toast';

import { DetailClientPage } from '../detail-client/detail-client'

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';



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

  client_list:AngularFirestoreCollection<Client>;
	clients: Observable<ClientID[]>
	name:string='';
	phone:string='';
	address:string='';

  constructor(
    public navCtrl: NavController,
    private afs:AngularFirestore,
    private toast:Toast
    ) {
    this.client_list = afs.collection<Client>('clients')
  	this.clients = this.client_list.snapshotChanges().map(actions=>{
  		return actions.map(action => ({key: action.payload.doc.id, ...action.payload.doc.data() as Client}));
  	})
  }

  addClient():void{
    if(this.name.trim() ==="" || this.phone.trim() ==="" || this.address.trim() ==="" ) return;
    const id = this.afs.createId();

    this.client_list.doc(id).set({
      name : this.name,
      phone : this.phone,
      address : this.address
    }).then(()=>{
      this.name = ""
      this.phone = ""
      this.address = ""
      this.toast.show(`Cliente Agregado`, '2000', 'center').subscribe()
    })

  	// this.client_list.push({
			// name : this.name,
			// phone : this.phone,
			// address : this.address
  	// })
  }

  gotoClient(key):void{
    let snap_client = this.afs.doc(`clients/${key}`)
  	this.navCtrl.push(DetailClientPage,{client:snap_client})
  }

}
