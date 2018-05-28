import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SingletonServiceProvider } from '../../providers/singleton-service/singleton-service'

import { Observable } from 'rxjs/Observable'

import { CreditPage } from '../credit/credit';

import { ClientID } from '../../providers/singleton-service/client.model'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  clients: Observable<ClientID[]>

  constructor(
    public navCtrl: NavController,
    private singleProvider:SingletonServiceProvider
  ) {
    this.clients = this.singleProvider.getClientCollection()
  }

  gotoCredit(key):void{
    this.navCtrl.push(CreditPage,{client_id:key})
  }
}
