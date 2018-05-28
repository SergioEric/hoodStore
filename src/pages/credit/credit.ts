import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import { Toast } from '@ionic-native/toast';

import { Observable } from 'rxjs/Observable'

import { SingletonServiceProvider } from '../../providers/singleton-service/singleton-service'

import { CreditId, Credit } from '../../providers/singleton-service/credit.model';

import * as moment from 'moment'

import { Chart } from 'chart.js';

import {DetailCreditPage} from '../detail-credit/detail-credit'
import { MonthsListPage } from '../months-list/months-list'
import { MonthStatePage } from '../month-state/month-state'

@Component({
  selector: 'page-credit',
  templateUrl: 'credit.html',
})
export class CreditPage {
  activeExtraButtons: boolean=false;

	items: Observable<CreditId[]>;
	amount:string='';
  client_id:string;

  constructor(public navCtrl: NavController,
  	public navParams:NavParams,
    public dialogs: Dialogs,
    private toast: Toast,
    private singleProvider:SingletonServiceProvider,
    ) {
    this.client_id = navParams.get('client_id')
    let month = navParams.get('month')
    if(month){
      this.items = singleProvider.getCreditsCollection(this.client_id,month)
    }else{
      this.items = singleProvider.getCreditsCollection(this.client_id)
    }
  }

  addTodo(): void {
    if(this.amount.trim().toString() === "") return;
    this.singleProvider.addCreditToCollection(this.amount)
	}
  detailOfValue(key):void{
    let one_credit = this.singleProvider.getSnapForOneCredit(key);
    this.navCtrl.push(DetailCreditPage,{data:one_credit})
  }
  setThrough(key):void{
    this.dialogs.confirm("Seguro que quieres tachar este valor?","Jefe",['Confirmar', 'Cancelar']).then((index)=>{
      if(index === 1) this.singleProvider.setThroughForOneCredit(key)
    }).catch(error=>{
      console.log(error)
    })
  }
  viewMonths(){
    this.navCtrl.push(MonthsListPage,{id:this.client_id})
  }
  viewOrModifyState(){
    let object:Object = this.singleProvider.getRefOfMonthState();
    this.navCtrl.push(MonthStatePage, object);
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
   	// console.log("ionViewDidLoad" ,this.pure_list);
 
    //     this.barChart = new Chart(this.barCanvas.nativeElement, {
 
    //         type: 'bar',
    //         data:{
    //         	labels:["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //         	datasets:[{
    //         		label:'cantidad fiada',
    //         		data:[12, 19, 3, 5, 2, 3],
    //     		   	backgroundColor: [
	   //              'rgba(255, 99, 132, 0.2)',
	   //              'rgba(54, 162, 235, 0.2)',
	   //              'rgba(255, 206, 86, 0.2)',
	   //              'rgba(75, 192, 192, 0.2)',
	   //              'rgba(153, 102, 255, 0.2)',
	   //              'rgba(255, 159, 64, 0.2)'
	   //          ],
    //         	}]
    //         },
    //         options: {
    //             scales: {
    //                 yAxes: [{
    //                     ticks: {
    //                         beginAtZero:true
    //                     }
    //                 }]
    //             }
    //         }
 
    //     });
      }

  activeExtra() {
    this.activeExtraButtons = !this.activeExtraButtons;
  }
}
//https://www.djamware.com/post/598953f880aca768e4d2b12b/creating-beautiful-charts-easily-using-ionic-3-and-angular-4
