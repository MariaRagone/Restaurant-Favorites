import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../Models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
//@Inject('BASE_URL') Will automatically add your c# api's url into the baseurl variable
  constructor(private http:HttpClient, @Inject('BASE_URL') private baseUrl: string) { }
  //? makes it optional
  //consider just making different methods
  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.baseUrl}api/Restaurant`); //the word 'Restaurant' has to match the first part of the controller name in the c# model
  }
  getAllFiltered(restaurant:string, orderAgain: boolean | null):Observable<Order[]>{
    if (orderAgain != null && restaurant != ""){
      return this.http.get<Order[]>(`${this.baseUrl}api/Restaurant?orderAgain=${orderAgain}&restaurant=${restaurant}`);
    }
    else if (restaurant != ""){
      return this.http.get<Order[]>(`${this.baseUrl}api/Restaurant?restaurant=${restaurant}`);
    }
    else if (orderAgain != null){
      return this.http.get<Order[]>(`${this.baseUrl}api/Restaurant?orderAgain=${orderAgain}`);
    }
    else
    return this.http.get<Order[]>(`${this.baseUrl}api/Restaurant`)
  }
  GetByID(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}api/Restaurant/${id}`);
    }

  // GetByCategory()

  addOrder(newOrder:Order): Observable<Order>{
    return this.http.post<Order>(`${this.baseUrl}api/Restaurant`, newOrder); //the end'newOrder' is the body portion of the url
  }

  updateOrder(updateOrder:Order): Observable<Order>{
    return this.http.put<Order>(`${this.baseUrl}api/Restaurant/${updateOrder.id}`, updateOrder); //the end 'updateOrder' is the body portion of the url
  }
  //this also works
  //UpdateOrder(id:number, order:Order):Observable<Order>{
  //return this.http.put<Order>(`${this.baseUrl}api/Restaurant/${id}`, order);
  //}

  deleteOrder(id: number): Observable<Order>{
    return this.http.delete<Order>(`${this.baseUrl}api/Restaurant/${id}`);
  }


}
