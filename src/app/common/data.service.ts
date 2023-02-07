import { Injectable, OnInit } from '@angular/core';
import { Item } from '../model/item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit {
  items: Item[] = [];
  data: object
  constructor(private http: HttpClient) { }
  ngOnInit(): void {

  }
  getDataFromApi(pageNumber: number, sortOrder: number = 1, sortCategory = "itemName", searchText = "", lowerLimit: number = 0, upperLimit: number = 0): Observable<any> {
    let params = {
      "pageNumber": pageNumber,
      "limit": 6,
      "searchText": searchText,
      "sortCategory": sortCategory,
      "sortOrder": sortOrder,
      "lowerLimit": lowerLimit,
      "upperLimit": upperLimit
    }
    return this.http.post<any>("http://localhost:3000/datas", params)

  }
}
