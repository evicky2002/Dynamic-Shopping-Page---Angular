import { Component, Inject, Input, OnInit, Output, } from '@angular/core';
import { Item } from '../model/item';
import { DataService } from '../common/data.service';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { MessengerService } from '../common/messenger.service';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { Observable, Subject } from 'rxjs';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @Output() itemAdded: boolean = false
  @Input() searchText: string
  // p: number = 1;
  // count: number = 6
  pages: number[] = []
  currentPage = 1
  arrItems: any[] = []
  totalPages: number
  faCartShopping = faCartShopping
  items: Item[] = []
  allItems: Item[] = []
  isSearchOn = false
  constructor(private dataService: DataService, private msg: MessengerService, private router: Router) { }
  ngOnInit(): void {
    this.msg.getText().subscribe((a: any) => {
      this.searchText = a
      this.isSearchOn = true
    }
    )

    this.dataService.getAllData().then(
      (res) => {
        this.allItems = res as Item[]
        let totalItemLength = this.allItems.length
        this.totalPages = totalItemLength / 6
        console.log("1 promise finish")
        console.log(this.totalPages);
        for (let i = 1; i <= this.totalPages; i++) {
          this.pages.push(i)
        }
        console.log(this.pages);
      },
      (error) => {
        console.log("error")
      }
    )
    this.dataService.getData(this.currentPage).then(
      (res) => {
        this.items = res as Item[]
        console.log(this.currentPage);
        console.log("2 promise finish")
        console.log(this.items);
      },
      (error) => {
        console.log("error")
      })

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    let stringObjects = JSON.parse(JSON.stringify(localStorage.getItem("items") || "[]"))
    let objects = JSON.parse(stringObjects)
    if (this.arrItems.length === 0) {
      this.arrItems = objects
    } else {
      this.arrItems = [objects]
    }

    // this.items = this.dataService.getUsers()

    this.msg.getMsg().subscribe((p: any) => {
      let a: Object = Object(p)
      let b = JSON.stringify(a)
      let c = JSON.parse(b)

      if (c.item.itemName != '') {
        let e = {
          "item": c.item,
          "count": c.count
        }
        let payload = this.arrItems as object
        if (e.count != 0) {
          this.arrItems.push(e)
        }
        localStorage.setItem("items", JSON.stringify(payload))
      } else {
        localStorage.setItem("count", c.count)
        //action ll be on main to update cart count
      }
    })
  }

  handlePreviousPageClick() {
    if (this.currentPage === 1) {
      console.log("total pages:" + this.totalPages);
      this.handlePageClick(this.totalPages + 1)
    } else {
      this.handlePageClick(this.currentPage + 1 - 1)
    }
    this.handlePageClick(this.currentPage - 1)
  }
  handleNextPageClick() {
    if (this.currentPage === this.totalPages) {
      this.handlePageClick(1)
    } else {
      this.handlePageClick(this.currentPage + 1)
    }

  }

  handlePageClick(a: number) {
    this.currentPage = a
    console.log(a)

    this.dataService.getData(this.currentPage).then(
      (res) => {
        this.items = res as Item[]
        console.log(this.currentPage);
        console.log("2 promise finish")
        console.log(this.items);
      },
      (error) => {
        console.log("error")
      })
  }
}
