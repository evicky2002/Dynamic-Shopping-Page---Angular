import { Component, Input, OnInit } from '@angular/core';
import { MessengerService } from '../common/messenger.service';
import { Item } from '../model/item';
import { faCartShopping, faPlus, faMinus, faL } from '@fortawesome/free-solid-svg-icons';
import { CartListComponent } from '../cart-list/cart-list.component';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  showAlert = false

  constructor(private msg: MessengerService) {

  }

  @Input() item: Item
  @Input() count: number = 0
  faPlus = faPlus
  faMinus = faMinus
  ngOnInit(): void {

  }
  handleAddToCart() {
    if (this.count === 0) {

    } else {
      this.msg.sendMsg(this.item, this.count)
      this.showAlert = true
      setTimeout(() => {
        console.log("wait")
      }, 100)
      setTimeout(() => {
        this.sendSignal()
      }, 1500)
    }
  }
  sendSignal() {
    this.showAlert = false

  }


  incrementItem() {
    this.count++
  }
  decrementItem() {
    this.count--
    if (this.count < 0) {
      this.count = 0
    }
  }

}
