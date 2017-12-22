import { Injectable,ViewChild } from '@angular/core';
import { Http }       from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
declare var require: any;

@Injectable()

export class ComponentsService {
  private subject = new Subject<any>();

constructor(private http: Http) { 

  }

  alert(alertType: any, objData: any) {
    console.log(alertType,objData);
    this.subject.next({ type: alertType , data: objData});
  }

  getMessage(): Observable<any> {
  	console.log("calleds",this.subject);
    return this.subject.asObservable();
  }

  alertboards(alertType: string, objData: any) {
    console.log(alertType,objData);
    this.subject.next({ type: alertType , data: objData});
  }

  getBoards(): Observable<any> {
    console.log("calleds",this.subject);
    return this.subject.asObservable();
  }

 
}