import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailCreditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail-credit',
  templateUrl: 'detail-credit.html',
})
export class DetailCreditPage {

	one_value:any={
		value:0,
    createdAt:new Date(),
    through:false
	}

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	let value = navParams.get('data')
  	value.snapshotChanges().subscribe(action => {
		  console.log(action.type);
		  console.log(action.key)
		  console.log(action.payload.val())
		  this.one_value = {
		  	value:action.payload.val().value,
  			createdAt:action.payload.val().createdAt,
      	through:action.payload.val().through
    	}
		});
  	// this.one_value  = value;
  	// debugger;
  }

  addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailCreditPage');
  }

}
