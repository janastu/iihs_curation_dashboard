 import { DataService } from '../../services/data-service';
import { Global } from '../../shared/global';
import { Injectable,ViewChild } from '@angular/core';
@Injectable()
export class CreateBoardStore{
   
  constructor(public dataService:DataService,public variab:Global){}
    dispatch(type,payload){
      switch (type) {
        case 'ADD_ITEMS':
         return this.dataService.addtodatabase(payload);
        case 'UPDATE_ITEM':  
        var doc:any=[];
        this.dataService.getfromdatabase().then(res=>{
          doc =  res;
            var doctoupdate = doc.filter(val=>{

            if(val.value.label === payload.label ){
            val.value.target.push(payload.target);
            
            return val.value;
          }
          });
           return this.dataService.updatedoc(doctoupdate[0].value);
        });
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