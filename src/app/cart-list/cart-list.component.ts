import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  grandTotal = 0
  total: number = 0
  showTotal: boolean = false
  isEmpty: boolean = false

  savedObj: any
  ngOnInit(): void {
    this.savedObj = localStorage.getItem("items")
    this.savedObj = JSON.parse(this.savedObj)

    console.log(this.savedObj);
    if (this.savedObj === null) {

    } else {
      if (this.savedObj.length > 0) {
        this.showTotal = true
        for (let a in this.savedObj) {
          let item = this.savedObj[a]
          let itemCount = this.savedObj[a].count
          this.grandTotal = this.grandTotal + (itemCount * item.item.itemPrice)
        }
        console.log(this.grandTotal)


      } else {
        this.isEmpty = true
      }
    }
  }
  clearCart() {
    localStorage.removeItem("items")
    localStorage.removeItem("count")

  }
}
