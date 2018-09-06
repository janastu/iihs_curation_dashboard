import { Injectable,ViewChild } from '@angular/core';
import { Http }       from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable,ReplaySubject } from 'rxjs';
declare var require: any;

@Injectable()

export class ComponentsService {
  public subject = new Subject<any>();
  annotations:any;
  readLater:any;
  recentlyread:any;
  boards = new Subject<any>();
  categories = new Subject<any>();
constructor(private http: Http) {
  this.subject.asObservable();
}

  alert(alertType: any, objData: any) {
    console.log(alertType,objData);
    this.subject.next({ type: alertType , data: objData});
  }

  getMessage(): Observable<any> {
  	//console.log("calleds",this.subject);
    return this.subject.asObservable();
  }

  addAnnotations(alertType: string, objData: any) {
   //  console.log(alertType,objData);
    this.annotations = { type: alertType , data: objData};
  }

    getannotations() {
  //console.log("calleds",this.annotations);
    return this.annotations;
    }
    addReadLater(alertType: string, objData: any) {
      //console.log(alertType,objData);
      this.readLater= { type: alertType , data: objData};
    }

    getReadLater() {
    //console.log("calleds",this.annotations);
      return this.readLater;
    }
    addRecentlyRead(alertType: string, objData: any) {
      //  console.log(alertType,objData);
        this.recentlyread = { type: alertType , data: objData};
    }

    getRecentlyRead(){
      //console.log("calleds",this.annotations);
        return this.recentlyread;
      }
      addBoards(alertType: string, objData: any) {
          //console.log(alertType,objData);
          this.boards.next({ type: alertType , data: objData});
      }

      getBoards():Observable<any>{
        //console.log("calleds",this.boards);
          return this.boards.asObservable();
        }
        addCategories(alertType: string, objData: any) {
            //console.log(alertType,objData);
            this.categories.next({ type: alertType , data: objData});
        }

        getCategories():Observable<any>{
          //console.log("calleds",this.boards);
            return this.categories.asObservable();
          }




}
