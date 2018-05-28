import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable'
import { Toast } from '@ionic-native/toast';

import { DetailClientPage } from '../detail-client/detail-client'

import { SingletonServiceProvider } from '../../providers/singleton-service/singleton-service'
import {Client, ClientID } from '../../providers/singleton-service/client.model'

@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html'
})
export class ClientPage {

	clients: Observable<ClientID[]>
	name:string='';
	phone:string='';
	address:string='';

  constructor(
    public navCtrl: NavController,
    private singleProvider:SingletonServiceProvider,
    private toast:Toast
    ) {
      this.clients = singleProvider.getClientCollection()
  }

  addClient():void{
    if(this.name.trim() ==="" || this.phone.trim() ==="" || this.address.trim() ==="" ) return;
    let client:Client = {
      name : this.name,
      phone : this.phone,
      address : this.address
    }
    this.singleProvider.addClientToCollection(client).then((res)=>{
        this.name = ""
        this.phone = ""
        this.address = ""
        console.log(`client ${res}`)
        this.toast.show(`Cliente Agregado`, '2000', 'center').subscribe()
    });
  }

  gotoClient(key):void{
    let snap_client = this.singleProvider.getClientDocument(key)
  	this.navCtrl.push(DetailClientPage,{client:snap_client})
  }

}
