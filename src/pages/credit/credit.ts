import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {AngularFireDatabase,AngularFireList} from 'angularfire2/database'
import { Observable } from 'rxjs/Observable'

import * as moment from 'moment'


interface Item{
  value:Number,
  createdAt:string,
  through:boolean
}

@Component({
  selector: 'page-credit',
  templateUrl: 'credit.html',
})
export class CreditPage {
	
	items: Observable<any[]>;
	todos:AngularFireList<Item>;
	textTodo:string='';
  total:Observable<any>;
  aux:any=0;

  client_id:string;

  constructor(public navCtrl: NavController,
  	public navParams:NavParams,
  	private afDB: AngularFireDatabase) {

  	this.client_id = navParams.get('client_id')

  	this.todos = afDB.list(`precios/${this.client_id}/${moment().format("MMM Do YY").split(' ')[0]}`)
    // let aux = 0; 
    this.items = afDB.list(`precios/${this.client_id}/${moment().format("MMM Do YY").split(' ')[0]}`).snapshotChanges().map(actions => {
      this.aux =0;
      return actions.map(action => {
        if(action.payload.val().through == false){ // si no estan tachados
          this.aux += action.payload.val().value;
        }
        this.total = this.aux;
        console.log(this.aux);
        return {
          key: action.key, ...action.payload.val()
        }
      });
    })
  } //({ key: action.key, ...action.payload.val() })

  addTodo(): void {
    if(this.textTodo.trim().toString() === "") return;
    const number = new Number(this.textTodo).valueOf()
    let dt = moment().format()
  	this.todos.push({
      value:number,
      createdAt:dt,
      through:false
    })
	}
  updateTodo(key,newValue):void{
    const num = 0
    this.afDB.object(`precios/${this.client_id}/${moment().format("MMM Do YY").split(' ')[0]}/${key}`).update({value:num})
  }
  deleteTodo(key):void{
    // this.afDB.object(`precios/${key}`).remove()
     this.afDB.object(`precios/${this.client_id}/${moment().format("MMM Do YY").split(' ')[0]}/${key}`).update({through:true})
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
}
