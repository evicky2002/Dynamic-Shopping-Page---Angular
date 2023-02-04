import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Item } from '../model/item';

@Injectable({
  providedIn: 'root'

})
export class MessengerService {
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
}
