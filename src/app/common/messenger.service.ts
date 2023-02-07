import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Item } from '../model/item';

@Injectable({
  providedIn: 'root'

})
export class MessengerService {
  searchTextSubject = new Subject()
  itemSubject = new Subject()
  sortOrderSubject = new Subject()
  priceFilterSubject = new Subject()
  constructor() { }
  sendCartItem(item: Item, count: number) {
    let a: any = {
      "item": item,
      "count": count
    }
    this.itemSubject.next(a)
  }
  getCartItem() {
    return this.itemSubject.asObservable()
  }

  sendSearchText(a: string) {
    this.searchTextSubject.next(a)
  }

  getSearchText() {
    return this.searchTextSubject.asObservable()
  }

  sendSortOrder(sortOrder: number, sortCategory: string) {
    let arr = [sortOrder, sortCategory]
    this.sortOrderSubject.next(arr)
  }

  getSortOrder() {
    return this.sortOrderSubject.asObservable()
  }


  sendPriceRange(lowerLimit: number, upperLimit: number) {
    let arr = [lowerLimit, upperLimit]
    this.priceFilterSubject.next(arr)
  }

  getPriceRange() {
    return this.priceFilterSubject.asObservable()
  }
}
