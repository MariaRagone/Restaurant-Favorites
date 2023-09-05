import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Order } from 'src/app/Models/order';

@Component({
  selector: 'app-add-order-form',
  templateUrl: './add-order-form.component.html',
  styleUrls: ['./add-order-form.component.css']
})
export class AddOrderFormComponent implements OnInit {
  newOrder: Order = {} as Order
  @Output() OrderCreated = new EventEmitter<Order>();
  constructor() { }
  ngOnInit(): void {
  }
  createOrder(){
    if(this.newOrder.orderAgain == null){
      this.newOrder.orderAgain = false;
    }
    this.OrderCreated.emit(this.newOrder);
    //reset the form
    this.newOrder = {} as Order;
     }
}
