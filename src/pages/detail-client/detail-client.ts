import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'page-detail-client',
  templateUrl: 'detail-client.html',
})
export class DetailClientPage {

	client_obj:any={
		name :'',
		phone :'',
		address :''
	};

  constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private callNumber: CallNumber
   ) {
  	let snap_client = navParams.get('client')
  	snap_client.snapshotChanges().subscribe(action=>{
  		this.client_obj = {
					name : action.payload.val().name,
					phone : action.payload.val().phone,
					address : action.payload.val().address,
  		}
  	})
  }
  makeCall():void{

  	this.callNumber.callNumber(this.client_obj.phone, false)
	  .then(res => console.log('Launched dialer!', res))
	  .catch(err => console.log('Error launching dialer', err));
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad DetailClientPage');
  }

}
