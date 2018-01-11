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
         //return this.dataService.updatedoc(doc[0].value);
      case 'MODIFY_DELETED':
        console.log("pay",payload)
         return this.dataService.updatedatabase(payload);
      default:
      
      }
    }
  
}