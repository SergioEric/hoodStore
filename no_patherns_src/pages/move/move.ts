import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { OrderPage } from './order/order'
import { BitMovePage } from './bit-move/bit-move'
@Component({
  selector: 'page-move',
  templateUrl: 'move.html'
})
export class MovePage {

  constructor(public navCtrl: NavController) {
  }

	gotoOrder(){
		this.navCtrl.push(OrderPage)
	}
	gotBitMove(){
		this.navCtrl.push(BitMovePage)
	}

}
