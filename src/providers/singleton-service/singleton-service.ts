import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import { Toast } from '@ionic-native/toast';

import { Observable } from 'rxjs/Observable'

import {Client, ClientID} from './client.model'
import { CreditId, Credit } from './credit.model';


import * as moment from 'moment'


@Injectable()
export class SingletonServiceProvider {
  client_collection:AngularFirestoreCollection<Client>;
  clients_list: Observable<ClientID[]>

  /*
  for cedrit logic
  */
  credit_list: Observable<CreditId[]>;

  creditCollection: AngularFirestoreCollection<Credit>;

  amount:string='';
  total:Observable<any>;
  aux:any=0;

  list_aux:any[];
  pure_list:any[];
  month:string;

  client_id:string;
  month_param=[false,''];//si viene por parametro, el valor
  year;

  constructor(
    private afs:AngularFirestore,
    private toast: Toast,
  ){
    console.log("Instance of SingletonServiceProvider")
  }

  getClientCollection(){
    this.client_collection = this.afs.collection<Client>('clients')
    this.clients_list = this.client_collection.snapshotChanges().map(actions=>{
      return actions.map(action => ({key: action.payload.doc.id, ...action.payload.doc.data() as Client}));
    })
    return this.clients_list;
  }

  getCreditsCollection(client_id:string,_month?:string){
    this.year = moment().year()

    this.month = moment().format("MMM Do YY").split(' ')[0];

    this.client_id = client_id;

    // let month = _month;
    if(_month){
      console.log(`Mes vino por params: ${_month}`);
      this.month_param[0]= true;
      this.month_param[1]= _month;

      this.creditCollection = this.afs.collection<Credit>(`prices-${this.year}/${this.client_id}/${_month}`, ref=>{
        let q = ref.orderBy('createdAt',"desc")
        return q;
      });
    }else{
      this.creditCollection = this.afs.collection<Credit>(`prices-${this.year}/${this.client_id}/${this.month}`,ref=>{
        let q = ref.orderBy('createdAt',"desc")
        return q;
      });
    }

    this.credit_list = this.creditCollection.snapshotChanges().map(

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

    });
    return this.credit_list;
  }

  addCreditToCollection(amount:string): void {
    const number = new Number(amount).valueOf()
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
    this.creditCollection.doc(id).set({
      value:number,
      createdAt:dt,
      through:false
    }).then(()=>{
        this.amount = '' // limpiamos el campo
        this.toast.show(`Agregado`, '2000', 'center').subscribe();
    })
  }

  getSnapForOneCredit(key:string):AngularFirestoreDocument<Credit>{
    let ref:AngularFirestoreDocument<Credit>;
    if(this.month_param[0]){
        ref = this.afs.doc(`prices-${this.year}/${this.client_id}/${this.month_param[1]}/${key}`)
    }else{
      ref = this.afs.doc(`prices-${this.year}/${this.client_id}/${this.month}/${key}`)
    }
    return ref;
  }
  setThroughForOneCredit(key):void{
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
  getRefOfMonthState():Object{
    let doc;
    let ref;
    if(this.month_param[0]){
      ref = `prices-${this.year}/${this.client_id}/${this.month_param[1]}/state`
    }else{
      ref = `prices-${this.year}/${this.client_id}/${this.month}/state`
    }
    doc = this.afs.doc(ref)
    return {
      month:doc,
      ref:ref,
      total:this.total
    };
  }
}


