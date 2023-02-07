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
  searchText: string

  selectedOption: string;
  selectedFilter: string
  printedOption: string;
  value = "vicky"

  constructor(private dataService: DataService, private msg: MessengerService, private router: Router) { }



  options = [
    { name: "Name-Ascending", value: 1 },
    { name: "Name-Descending", value: 2 },
    { name: "Price-Ascending", value: 1 },
    { name: "Price-Descending", value: 2 }]

  filterOptions = [
    { name: "Price($0-$5)", value: 1 },
    { name: "Price($6-$10)", value: 2 },
    { name: "Price($11-$20)", value: 1 },
    { name: "Price($20-$100)", value: 2 }
  ]
  //Search product
  searchProducts() {
    this.ngOnInit()
    if (this.searchText) {
      this.showError = false
      //Send search text to shop component
      this.msg.sendSearchText(this.searchText)
    } else {
      this.showError = true
    }
  }

  changeFilter() {
    let lowerLimit = 0
    let upperLimit = 0

    if (this.selectedFilter == "Price($0-$5)") {
      lowerLimit = 0
      upperLimit = 5
    } else if (this.selectedFilter == "Price($6-$10)") {
      lowerLimit = 6
      upperLimit = 10

    } else if (this.selectedFilter == "Price($11-$20)") {
      lowerLimit = 11
      upperLimit = 20

    } else {
      lowerLimit = 21
      upperLimit = 100
    }

    console.log(lowerLimit);
    console.log(upperLimit);
    this.msg.sendPriceRange(lowerLimit, upperLimit)
  }

  changeSortOrder() {
    this.printedOption = this.selectedOption;
    let category = "itemName"
    let temp = 1
    if (this.selectedOption == "Clear") {
      return
    }


    if (this.selectedOption == "Name-Ascending") {
      temp = 1
    } else {
      temp = -1
    }

    if (this.selectedOption == "Price-Ascending") {
      category = "itemPrice"
      temp = 1
    } else if (this.selectedOption == "Price-Descending") {
      category = "itemPrice"
      temp = -1
    }
    this.msg.sendSortOrder(temp, category)

  }
  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //Set cart indicator to 0 if local storage is empty
    if (JSON.parse(JSON.stringify(localStorage.getItem("items"))) === null || JSON.parse(JSON.stringify(localStorage.getItem("count"))) === null) {
      this.cartNumber = 0
    } else {
      this.cartNumber = parseInt(JSON.parse(JSON.stringify(localStorage.getItem("count"))))
    }

    //listen for item component - add to cart
    this.msg.getCartItem().subscribe((res: any) => {

      let selectedProduct_obj = Object(res)
      let selectedProduct_str = JSON.stringify(selectedProduct_obj)
      let selectedProduct = JSON.parse(selectedProduct_str)
      let currentCartCount = parseInt(JSON.parse(JSON.stringify(localStorage.getItem("count"))));

      if (selectedProduct.item.itemName === "") {
        //message is from cart item component to reflect changes from cart
        let temp = selectedProduct.count
        this.cartNumber = temp
        localStorage.setItem("count", temp)
      } else {
        //message is from item component to update cart number
        if (isNaN(currentCartCount)) {
          currentCartCount = 0
        } else {
          currentCartCount = parseInt(JSON.parse(JSON.stringify(localStorage.getItem("count"))))
        }
        let temp = selectedProduct.count + currentCartCount
        this.cartNumber = temp
        localStorage.setItem("count", temp)
      }
    })
  }
}
