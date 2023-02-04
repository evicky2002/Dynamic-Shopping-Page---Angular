import { Component, OnInit } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../common/data.service';
import { MessengerService } from '../common/messenger.service';
import { Router } from '@angular/router';
import { isEmpty } from 'rxjs';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  showError = false

  arrItems: any[] = []

  cartNumber: number = 0

  faCartShopping = faCartShopping
  constructor(private dataService: DataService, private msg: MessengerService, private router: Router) { }
  searchText: string

  refresh() {
    this.ngOnInit()
    if (this.searchText) {
      this.showError = false
      this.msg.sendText(this.searchText)
    } else {
      this.showError = true
    }
  }

  ngOnInit(): void {

    let total = 0
    console.log(this.searchText);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    let d: number
    if (JSON.parse(JSON.stringify(localStorage.getItem("items"))) === null || JSON.parse(JSON.stringify(localStorage.getItem("count"))) === null) {
      console.log("null");
      this.cartNumber = 0
    } else {
      d = parseInt(JSON.parse(JSON.stringify(localStorage.getItem("count"))))
      let stringObjects = JSON.parse(JSON.stringify(localStorage.getItem("items") || "[]"))
      let objects = JSON.parse(stringObjects)
      if (this.arrItems.length === 0) {
        this.arrItems = objects
      } else {
        this.arrItems = [objects]
      }
      for (let a in this.arrItems) {
        total = total + this.arrItems[a].count
      }
      console.log(total);
      d = total
      this.cartNumber = parseInt(JSON.parse(JSON.stringify(localStorage.getItem("count"))))


    }
    this.msg.getMsg().subscribe((p: any) => {
      let a: Object = Object(p)
      let b = JSON.stringify(a)
      let c = JSON.parse(b)
      let e = parseInt(JSON.parse(JSON.stringify(localStorage.getItem("count"))));
      console.log(c.item.itemName === "");
      if (c.item.itemName === "") {
        let temp = c.count
        console.log(temp);
        console.log(temp)
        this.cartNumber = temp
        localStorage.setItem("count", temp)
      } else {
        if (isNaN(e)) {
          e = 0
        } else {
          e = parseInt(JSON.parse(JSON.stringify(localStorage.getItem("count"))))
        }
        console.log(e)
        let temp = c.count + e
        console.log(temp);
        console.log(temp)
        this.cartNumber = temp
        localStorage.setItem("count", temp)
      }
    })
  }
}
