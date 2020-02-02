import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit{

@Input('cart') cart:ShoppingCart;
 
  ngOnInit() {
    
  }
}
