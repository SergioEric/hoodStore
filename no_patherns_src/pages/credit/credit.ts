import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import { Toast } from '@ionic-native/toast';

// import {AngularFireDatabase,AngularFireList} from 'angularfire2/database'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable'

import * as moment from 'moment'

import { Chart } from 'chart.js';

import {DetailCreditPage} from '../detail-credit/detail-credit'
import { MonthsListPage } from '../months-list/months-list'
import { MonthStatePage } from '../month-state/month-state'


interface Item{
  value:Number,
  createdAt:string,
  through:boolean
}
interface ItemId extends Item{
  key:string
}

@Component({
  selector: 'page-credit',
  templateUrl: 'credit.html',
})
export class CreditPage {
  activeExtraButtons: boolean=false;

	items: Observable<ItemId[]>;

	// client_list:AngularFireList<Item>;//database
	itemsCollection: AngularFirestoreCollection<Item>;

	amount:string='';
  total:Observable<any>;
  aux:any=0;

  list_aux:any[];
  pure_list:any[];
  month:string;

  client_id:string;
  month_param=[false,''];//si viene por parametro, el valor

	// @ViewChild('barCanvas') barCanvas;
 //  @ViewChild('doughnutCanvas') doughnutCanvas;
 //  @ViewChild('lineCanvas') lineCanvas;

 //  barChart: any;
 //  doughnutChart: any;
 //  lineChart: any;

  year;//este anio

  constructor(public navCtrl: NavController,
  	public navParams:NavParams,
    public dialogs: Dialogs,
    private toast: Toast,
    private afs: AngularFirestore
    ) {
    this.year = moment().year()

    this.month = moment().format("MMM Do YY").split(' ')[0]

    this.client_id = navParams.get('client_id')

    let month = navParams.get('month')
    if(month){
      console.log(`Mes vino por params: ${month}`);
      this.month_param[0]= true;
      this.month_param[1]= month;
      // this.client_list = afDB.list(`prices-${this.year}/${this.client_id}/${month}`)
      this.itemsCollection = afs.collection<Item>(`prices-${this.year}/${this.client_id}/${month}`, ref=>{
        let q = ref.orderBy('createdAt',"desc")
        return q;
      });
    }else{
      // this.itemsCollection = afs.collection<Item>(`prices-${this.year}`).doc(this.client_id).collection(this.month);
      this.itemsCollection = afs.collection<Item>(`prices-${this.year}/${this.client_id}/${this.month}`,ref=>{
        let q = ref.orderBy('createdAt',"desc")
        return q;
      });
    }

    // let aux = 0; 
    this.items = this.itemsCollection.snapshotChanges().map(

      actions => {
      this.aux =0;
      this.list_aux = []
      return actions.map(action => {
        if(action.payload.doc.data().through == false){ // si no estan tachados
          this.aux += action.payload.doc.data().value;
          // this.list_aux.push(action.payload.doc.data().value)
        }
        // this.pure_list = this.list_aux;
        this.total = this.aux;
        console.log(action.payload.doc.id);
        // this.renderChart()
        return {
          key: action.payload.doc.id, ...action.payload.doc.data() as Item
        }
      });

    })
  } //({ key: action.key, ...action.payload.val() })

  addTodo(): void {
    if(this.amount.trim().toString() === "") return;
    const number = new Number(this.amount).valueOf()
    let dt = moment().format()

    //for firestore
    const id = this.afs.createId();
    // const item: Item = { id, name };
    this.afs.doc(`prices-${this.year}/${this.client_id}`).snapshotChanges().subscribe(actions=>{
      // if(actions.payload.data().ArrayOfMonth)
      let exist = false;
      let aux_moths=[];
      if(actions.payload.exists){//si existe documentos en la coleccion

        aux_moths = actions.payload.data().ArrayOfMonth
        actions.payload.data().ArrayOfMonth.map((v)=>{ 
          if(v==this.month){
            //si ya esta el campo en la db
            exist=true;
            console.log(`El campo con la fecha ${this.month} existe`);
           }
        })
      }else{
        //por primera vez, cuando se agrega el primer valor del mes
        console.log('primer valor agregado en la lista del mes');
        this.afs.doc(`prices-${this.year}/${this.client_id}`).set({ArrayOfMonth:aux_moths})
        //se crea el state del mes, que inicialmente esta en false, y sin abono
        // pay: abonar, paid: pagado
        this.afs.doc(`prices-${this.year}/${this.client_id}/${this.month}/state`).set({
          pay:[{
            value:0,
            date:dt
          }],
          paid:false
        })
      }
      if(!exist){// si no existe el mes actual en la ref
        aux_moths.push(this.month)
        this.afs.doc(`prices-${this.year}/${this.client_id}`).update({ArrayOfMonth:aux_moths})
      }
      // debugger
    })
    this.itemsCollection.doc(id).set({
      value:number,
      createdAt:dt,
      through:false
    }).then(()=>{
        this.amount = '' // limpiamos el campo
        this.toast.show(`Agregado`, '2000', 'center').subscribe();

    })

  	/*this.client_list.push({
      value:number,
      createdAt:dt,
      through:false
    }).then(()=>{
      this.amount = '' // limpiamos el campo
      this.toast.show(`Agregado`, '2000', 'center').subscribe();
    })*/
	}
  detailOfValue(key):void{
    let one_credit;
    if(this.month_param[0]){
        one_credit = this.afs.doc(`prices-${this.year}/${this.client_id}/${this.month_param[1]}/${key}`)
      // one_credit = this.afDB.object(`prices-${this.year}/${this.client_id}/${this.month_param[1]}/${key}`)
      //for firestore
      // one_credit = this.afs.collection(`prices-${this.year}`).doc(this.client_id).collection(this.month_param[1].toString()).doc(key)
    }else{
      one_credit = this.afs.doc(`prices-${this.year}/${this.client_id}/${this.month}/${key}`)
      // one_credit = this.afs.collection(`prices-${this.year}`).doc(this.client_id).collection(this.month).doc(key)
    }

    this.navCtrl.push(DetailCreditPage,{data:one_credit})
  }
  setThrough(key):void{
    // this.afDB.object(`prices-${this.year}/${key}`).remove()
    this.dialogs.confirm("Seguro que quieres tachar este valor?","Jefe",['Confirmar', 'Cancelar']).then((index)=>{
      if(index===1){
        if(this.month_param[0]){//por navparam
          this.afs.collection(`prices-${this.year}`).doc(this.client_id).collection(this.month_param[1].toString()).doc(key).update({through:true}).then(()=>{
             //se agrego a la base de datos
             this.toast.show(`Se ha tachado`, '2000', 'center').subscribe();
         }).catch(error=>{
             alert(error)
         });
        }else{
          this.afs.collection(`prices-${this.year}`).doc(this.client_id).collection(this.month).doc(key).update({through:true}).then(()=>{
             //se agrego a la base de datos
             this.toast.show(`Se ha tachado`, '2000', 'center').subscribe();
           }).catch(error=>{
               alert(error)
         });
       }
      }
    }).catch(error=>{
      console.log(error)
    })
  }
  viewMonths(){
    this.navCtrl.push(MonthsListPage,{id:this.client_id})
  }
  viewOrModifyState(){
    let data;
    let ref;
    if(this.month_param[0]){
      ref = `prices-${this.year}/${this.client_id}/${this.month_param[1]}/state`
    }else{
      ref = `prices-${this.year}/${this.client_id}/${this.month}/state`
    }
    data = this.afs.doc(ref)
    this.navCtrl.push(MonthStatePage, {month:data,ref:ref,total:this.total})
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
