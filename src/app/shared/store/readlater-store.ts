 import { DataService } from '../../services/data-service';
import { Global } from '../../shared/global';
import { Injectable,ViewChild } from '@angular/core';
@Injectable()
export class ReadlaterStore{
   
  constructor(public dataService:DataService,public variab:Global){}
    dispatch(type,payload){
      switch (type) {
        case 'ADD_ITEMS':
        console.log(payload);
         return this.dataService.addtodatabase(payload);
        case 'MODIFY_DELETED':
           console.log("pay",payload)
            return this.dataService.updatedatabase(payload);
       
         //return this.dataService.updatedoc(doc[0].value);
      /*case 'DELETE_ITEM':
       console.log("state",...state);
        return state.filter(item => {
          console.log("item",item,"pay",payload);
          return item.id !== payload.id;
        });
      default:
       console.log("state",...state);
        return state;*/
      }
    }
  
}