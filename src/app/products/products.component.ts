import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Products } from '../models/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Products[] = [];
  filteredProducts: Products[] = [];
  category: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService) {

    productService.getAll().snapshotChanges().pipe(
      map(action =>
        action.map(action => <Products>({ key: action.key, value: action.payload.val() })))
    ).pipe(
      switchMap(product => {
        this.products = product;
        return route.queryParamMap;
      })
    ).subscribe(param => {
        this.category = param.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.value.category === this.category) :
          this.products

      });
  }


}
