import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable'

import { CreditPage } from '../credit/credit';

// import * as moment from 'moment'

interface Client{
  name:string,
  phone:string,
  address:string
}
interface ClientID extends Client{
  key:string
}
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  client_list:AngularFirestoreCollection<Client>;
  clients: Observable<ClientID[]>
  name:string;
  phone:string;
  address:string;

  constructor(public navCtrl: NavController, private afs:AngularFirestore) {
    this.client_list = afs.collection<Client>('clients')
    this.clients = this.client_list.snapshotChanges().map(actions=>{
      return actions.map(action => ({key: action.payload.doc.id, ...action.payload.doc.data() as Client}));
    })
  }

  gotoCredit(key):void{
    this.navCtrl.push(CreditPage,{client_id:key})
  }
}
