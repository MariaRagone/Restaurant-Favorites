import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/order';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  orderListResult: Order[] = [];
  constructor(private _orderService: OrderService) {}

  ngOnInit(): void {
    // first run your api test methods to make sure they are working
    // this.apiTest();
    this.callGetOrders();

    //   this._orderService.getOrders().subscribe((response: Order[]) => {
    //     // Handle the array of orders here
    //     console.log(response);
    //     this.OrderListResult = response;
    //   });
  }
  callGetOrders() {
    this._orderService.getOrders().subscribe((response: Order[]) => {
      console.log(response);
      this.orderListResult = response;
    });
  }

  getOrdersFiltered(newOrder: Order) {
    //method created to call the API from order.service.ts
    this._orderService
      .getAllFiltered('', null)
      .subscribe((response: Order[]) => {
        console.log(response);
        this.orderListResult = response;
      });
  }

  newOrder(newOrder: Order) {
    //method created to call the API from order.service.ts
    this._orderService.addOrder(newOrder).subscribe((response: Order) => {
      console.log(response);
      this.orderListResult.push(response);
    });
  }

  removeOrder(id: number): void {
    let target: number = this.orderListResult.findIndex((i) => i.id == id);
    //splice at the target index and remove 1
    this.orderListResult.splice(target, 1);
    this._orderService.deleteOrder(id).subscribe((response: Order) => {
      console.log(response);
    });
    // ------ CAN ALSO USE THIS METHOD TO REMOVE ORDER --------
    // removeOrder(target:Order): void {
    //   //temporarily remove the array
    //   this.orderListResult = [];
  
    //   this._orderService.deleteOrder(target.id).subscribe((response: Order) => {
    //     console.log(response);
    //     //get updated version of the aray
    //     this.callGetOrders();
    //   });
  
  }

  ///------------------- API TESTING -----------------
  apiTest() {
    //all orders
    this._orderService.getOrders().subscribe((response: Order[]) => {
      console.log(response);
    });

    //filter
    this._orderService
      .getAllFiltered('', true)
      .subscribe((response: Order[]) => {
        console.log(response);
      });

    //adding
    let o: Order = {
      id: 0,
      orderDescription: 'Quarter Pounder',
      rating: 4,
      restaurant: 'McDonalds',
      orderAgain: true,
    };
    this._orderService.addOrder(o).subscribe((response: Order) => {
      console.log(response);
    });
  }
}
