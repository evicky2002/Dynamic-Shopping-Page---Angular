import { Component, Input, OnInit } from '@angular/core';
import { faCartShopping, faPlus, faMinus, faL } from '@fortawesome/free-solid-svg-icons';
import { MainComponent } from '../main/main.component';
import { MessengerService } from '../common/messenger.service';
import { Item } from '../model/item';
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  cartItems: any[] = []
  updatedCartItems: any[] = []
  totalCount: number = 0

  @Input() item: any
  faPlus = faPlus
  faMinus = faMinus
  originalItemCount: number
  updatedItemCount: number
  shouldUpdate: boolean = false
  constructor(private msg: MessengerService) {

  }
  ngOnInit(): void {
    console.log(this.item.count);
    this.originalItemCount = this.item.count
    this.updatedItemCount = this.originalItemCount
  }
  incrementItem() {
    this.updatedItemCount++
    if (this.updatedItemCount != this.originalItemCount) {
      this.shouldUpdate = true
    } else {
      this.shouldUpdate = false
    }
  }
  decrementItem() {
    this.updatedItemCount--
    if (this.updatedItemCount < 0) {
      this.updatedItemCount = 0
    }
    if (this.updatedItemCount != this.originalItemCount) {
      this.shouldUpdate = true
    } else {
      this.shouldUpdate = false
    }
  }
  updateCount(event: Event) {
    if (this.updatedItemCount != this.originalItemCount) {
      let selectedItem = this.item.item._id
      let cartItems_string = JSON.parse(JSON.stringify(localStorage.getItem("items") || "[]"))
      let cartItems_obj = JSON.parse(cartItems_string)
      if (this.cartItems.length === 0) {
        this.cartItems = cartItems_obj
      } else {
        this.cartItems = cartItems_obj
      }


      for (let a in this.cartItems) {
        if (this.cartItems[a].item._id === selectedItem) {
          this.cartItems[a].count = this.updatedItemCount
          break
        }
      }

    }
    for (let a in this.cartItems) {
      if (this.cartItems[a].count === 0) {
      } else {
        this.updatedCartItems.push(this.cartItems[a])
      }
    }

    let cartQuantity = 0
    for (let a in this.cartItems) {
      cartQuantity = this.cartItems[a].count + cartQuantity
    }
    console.log("original total: " + cartQuantity)

    let payload = this.updatedCartItems as object
    localStorage.setItem("items", JSON.stringify(payload))


    // pass diff in place of 1
    let dummy: Item = {
      itemName: '',
      itemPrice: '',
      itemImage: ''
    }
    console.log("original count: " + this.originalItemCount)
    console.log("updated count: " + this.updatedItemCount)
    this.msg.sendMsg(dummy, cartQuantity)

  }
}
