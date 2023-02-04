import { Injectable, OnInit } from '@angular/core';
import { Item } from '../model/item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit {
  data: object
  constructor(private http: HttpClient) { }
  ngOnInit(): void {

  }
  items: Item[] = [
  ];

  getData_observable(): Observable<any> {
    return this.http.get("http://localhost:3000/datas")
  }

  getAllData() {
    const promise = new Promise<void>((resolve, reject) => {
      this.http.get<any>("http://localhost:3000/getAll").subscribe({
        next: (res: any) => {
          this.data = res
          res = Object.values(res)[0]
          this.data = res
          resolve(res);
        },
        error: (err: any) => {
          reject(err);
        },
        complete: () => {
          console.log('complete');
          console.log(this.data)
        },
      });
    }).then((res) => {
      console.log("after fetching");
      console.log(res);
      console.log(this.data)
      return this.data
    });
    return promise;
  }

  getData(a: number) {
    const promise = new Promise<void>((resolve, reject) => {
      this.http.get<any>("http://localhost:3000/datas?page=" + a).subscribe({
        next: (res: any) => {
          this.data = res
          res = Object.values(res)[0]
          this.data = res
          resolve(res);
        },
        error: (err: any) => {
          reject(err);
        },
        complete: () => {
          console.log('complete');
          console.log(this.data)
        },
      });
    }).then((res) => {
      console.log("after fetching");
      console.log(res);
      console.log(this.data)
      return this.data
    });
    return promise;
  }
}
