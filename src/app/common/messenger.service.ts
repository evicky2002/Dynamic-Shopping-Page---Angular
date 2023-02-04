import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Item } from '../model/item';

@Injectable({
  providedIn: 'root'

})
export class MessengerService {

  newSubject = new Subject()
  subject = new Subject()
  constructor() { }
  sendMsg(item: Item, count: number) {
    let a: any = {
      "item": item,
      "count": count
    }
    this.subject.next(a)
  }
  getMsg() {
    return this.subject.asObservable()
  }

  sendText(a: string) {
    this.newSubject.next(a)
  }

  getText() {
    return this.newSubject.asObservable()
  }
}
