import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Products } from '../models/products';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Products[] = [];
  filteredProducts: Products[] = [];
  category: string;
  cart$:Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService:ShoppingCartService) {
  }

  async ngOnInit() {
    this.populateProduct();
    this.cart$ = (await this.cartService.getCart());
  }

  private populateProduct() {
    this.productService.getAll().snapshotChanges().pipe(
      map(action =>
        action.map(action => <Products>({ key: action.key, value: action.payload.val() })))
    ).pipe(
      switchMap(product => {
        this.products = product;
        return this.route.queryParamMap;
      })
    ).subscribe(param => {
        this.category = param.get('category');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
          this.products.filter(p => p.value.category === this.category) :
          this.products;
  }
}
