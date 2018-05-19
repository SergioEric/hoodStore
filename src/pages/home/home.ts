import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {AngularFireDatabase,AngularFireList} from 'angularfire2/database'
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

  gotoCredit(key):void{
    this.navCtrl.push(CreditPage,{client_id:key})
  }
}
