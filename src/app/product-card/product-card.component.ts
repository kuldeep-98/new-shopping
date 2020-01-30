import { Component, OnInit, Input } from '@angular/core';
import { Products } from '../models/products';
import { Product } from '../models/form-product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product:Product;

  @Input('show-actions') showActions=true;
  constructor() { }

  ngOnInit() {
  }

}
