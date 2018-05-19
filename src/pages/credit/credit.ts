import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import { Toast } from '@ionic-native/toast';

import {AngularFireDatabase,AngularFireList} from 'angularfire2/database'
import { Observable } from 'rxjs/Observable'

import * as moment from 'moment'

import { Chart } from 'chart.js';

import {DetailCreditPage} from '../detail-credit/detail-credit'


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
	client_list:AngularFireList<Item>;
	amount:string='';
  total:Observable<any>;
  aux:any=0;

  list_aux:any[];
  pure_list:any[];
  month:string;

  client_id:string;

	@ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  constructor(public navCtrl: NavController,
  	public navParams:NavParams,
  	private afDB: AngularFireDatabase,
    public dialogs: Dialogs,
    private toast: Toast
    ) {
  	this.month = moment().format("MMM Do YY").split(' ')[0]

  	this.client_id = navParams.get('client_id')

  	this.client_list = afDB.list(`precios/${this.client_id}/${this.month}`)
    // let aux = 0; 
    this.items = this.client_list.snapshotChanges().map(actions => {
      this.aux =0;
      this.list_aux = []
      return actions.map(action => {
        if(action.payload.val().through == false){ // si no estan tachados
          this.aux += action.payload.val().value;
          // console.log(`ACTION :${JSON.stringify(action.payload.val())}` );
          // list_aux.push(JSON.stringify(action.payload.val()))
          this.list_aux.push(action.payload.val().value)
        }
        this.pure_list = this.list_aux;
        this.total = this.aux;
        console.log(this.list_aux);
        // this.renderChart()
        return {
          key: action.key, ...action.payload.val()
        }
      });
      /**/

    })
  } //({ key: action.key, ...action.payload.val() })

  addTodo(): void {
    if(this.amount.trim().toString() === "") return;
    const number = new Number(this.amount).valueOf()
    let dt = moment().format()
  	this.client_list.push({
      value:number,
      createdAt:dt,
      through:false
    }).then(()=>{
      this.amount = '' // limpiamos el campo
      this.toast.show(`Agregado`, '2000', 'center').subscribe();
    })
	}
  updateValue(key):void{
    // const num = 0
    // this.afDB.object(`precios/${this.client_id}/${this.month}/${key}`).update({value:num})
    let one_credit = this.afDB.object(`precios/${this.client_id}/${this.month}/${key}`)

    this.navCtrl.push(DetailCreditPage,{data:one_credit})
  }
  setThrough(key):void{
    // this.afDB.object(`precios/${key}`).remove()
    this.dialogs.confirm("Seguro que quieres tachar este valor?","Jefe",['Confirmar', 'Cancelar']).then((index)=>{
      if(index===1){
       this.afDB.object(`precios/${this.client_id}/${this.month}/${key}`).update({through:true}).then(()=>{
         //se agrego a la base de datos
         this.toast.show(`Se ha tachado`, '2000', 'center').subscribe();
       }).catch(error=>{
         alert(error)
       })
      }
    }).catch(error=>{
      console.log(error)
    })
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
   renderChart() {
   	console.log("ionViewDidLoad" ,this.pure_list);
 
        this.barChart = new Chart(this.barCanvas.nativeElement, {
 
            type: 'bar',
            data:{
            	labels:["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            	datasets:[{
            		label:'cantidad fiada',
            		data:[12, 19, 3, 5, 2, 3],
        		   	backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	                'rgba(153, 102, 255, 0.2)',
	                'rgba(255, 159, 64, 0.2)'
	            ],
            	}]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
 
        });
      }
}
//https://www.djamware.com/post/598953f880aca768e4d2b12b/creating-beautiful-charts-easily-using-ionic-3-and-angular-4
