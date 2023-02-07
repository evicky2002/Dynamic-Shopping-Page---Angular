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
  @Input() searchText: string = ""
  p: number = 1;
  count: number = 6
  pages: number[] = []
  currentPage = 1
  arrItems: any[] = []
  totalPages: number
  faCartShopping = faCartShopping
  items: Item[] = []
  allItems: Item[] = []
  isSearchOn = false
  sortOrder = 1
  sortCategory = "itemName"
  lowerLimit = 0
  upperLimit = 0
  constructor(private dataService: DataService, private msg: MessengerService, private router: Router) { }
  ngOnInit(): void {


    //price filter listener

    this.msg.getPriceRange().subscribe((arr: any) => {
      this.lowerLimit = arr[0]
      this.upperLimit = arr[1]
      this.getDataFromApiCall()

    })
    //search listener
    this.msg.getSearchText().subscribe((a: any) => {
      this.searchText = a
      this.isSearchOn = true
      //show current page data
      this.getDataFromApiCall()

    })

    //show current page data
    this.getDataFromApiCall()

    //sort listener
    this.msg.getSortOrder().subscribe((a: any) => {
      this.sortOrder = a[0]
      this.sortCategory = a[1]
      //show current page data
      this.getDataFromApiCall()
    })


    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //get objects from localstorage
    let stringObjects = JSON.parse(JSON.stringify(localStorage.getItem("items") || "[]"))
    let objects = JSON.parse(stringObjects)
    if (this.arrItems.length === 0) {
      this.arrItems = objects
    } else {
      this.arrItems = [objects]
    }

    //cart functionality
    this.msg.getCartItem().subscribe((res: any) => {
      let selectedItem_obj: Object = Object(res)
      let selectedItem_str = JSON.stringify(selectedItem_obj)
      let selectedItem = JSON.parse(selectedItem_str)
      if (selectedItem.item.itemName != '') {
        //message is from item component to add to cart
        let e = {
          "item": selectedItem.item,
          "count": selectedItem.count
        }
        let payload = this.arrItems as object
        if (e.count != 0) {
          this.arrItems.push(e)
        }
        localStorage.setItem("items", JSON.stringify(payload))
      } else {
        //message is from cart item to update cart count
        localStorage.setItem("count", selectedItem.count)
      }
    })
  }



  getDataFromApiCall() {
    this.dataService.getDataFromApi(this.currentPage, this.sortOrder, this.sortCategory, this.searchText, this.lowerLimit, this.upperLimit).subscribe(
      (res) => {

        this.totalPages = res.datas.totalItems
        this.items = res.datas.items

      },
      (error) => {
        console.log("error")
      })
  }
  //Pagination functions
  handlePageClick(a: number) {
    this.currentPage = this.p
    this.getDataFromApiCall()
  }
}
