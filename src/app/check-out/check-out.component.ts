import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { Shipping } from '../models/shipping';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shipping:Shipping={
    name:'',
    addressLine1:'',
    addressLine2:'',
    city: ''
  };
  cart: ShoppingCart;
  userId: string;
  subscrition: Subscription;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService:AuthService,
    private cartService: ShoppingCartService,
    private orderService: OrderService) { }

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.subscrition = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.subscrition.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId,this.shipping,this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success',result.key]);
  }
}
