import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {AngularFireDatabase,AngularFireList} from 'angularfire2/database'
import { Observable } from 'rxjs/Observable'

import { CreditPage } from '../credit/credit';

import * as moment from 'moment'

interface Client{
  name:string,
  phone:string,
  address:string
}
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
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

  gotoCredit(key):void{
    this.navCtrl.push(CreditPage,{client_id:key})
  }
}
