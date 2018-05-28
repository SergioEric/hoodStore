import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


// import {AngularFireDatabase,AngularFireList} from 'angularfire2/database'
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable'
import { map } from 'rxjs/operators';
import * as moment from 'moment'
import { Chart } from 'chart.js';


import { CreditPage } from '../credit/credit'

interface Months{
  key:string,
  payload:Function,
  query:Function
}

@Component({
  selector: 'page-months-list',
  templateUrl: 'months-list.html',
})
export class MonthsListPage {
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  barChart: any;
  doughnutChart: any;
  lineChart: any;
  months_list:AngularFirestoreDocument<Months>;
	items=[]//:Observable<any[]>;

  client_id:string;
  list_aux:any=[];
  year;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private afs: AngularFirestore
  	) {
    this.year = moment().year()


  	this.client_id = navParams.get('id')
    this.months_list = afs.doc(`prices-${this.year}/${this.client_id}`)
  	this.months_list.snapshotChanges().subscribe(actions=>{
      this.list_aux = []
      if(actions.payload.exists){
        actions.payload.data().ArrayOfMonth.map((value)=>{
          this.list_aux.push(value)
          this.items = this.list_aux
          this.drawChart();
        })
      }
    })
  }
  gotoCredit(key):void{
    this.navCtrl.setRoot(CreditPage,{
      client_id:this.client_id,
      month:key
    })
  }
  total;
  drawChart(){

    let list_totals=[]
    this.items.forEach((v)=>{
      console.log(`prices-${this.year}/${this.client_id}/${v}`);
      let afs = this.afs
      // debugger
      this.afs.collection(`prices-${this.year}/${this.client_id}/${v}`).snapshotChanges().subscribe(

      actions => {
      let aux =0;
      this.list_aux = []
      return actions.map(action => {
        if(action.payload.doc.data().through == false){ // si no estan tachados
          aux += action.payload.doc.data().value;
          // this.list_aux.push(action.payload.doc.data().value)
        }
        // this.pure_list = this.list_aux;
        this.total = aux;
        console.log(action.payload.doc.id);
        // this.renderChart()
      });

    })
    })
    console.log(list_totals);
    this.barChart = new Chart(this.barCanvas.nativeElement, {
 
            type: 'bar',
            data:{
              labels:this.items,
              datasets:[{
                label:'cantidad fiada',
                data:[1200, 1900]
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
 