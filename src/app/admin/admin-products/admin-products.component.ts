import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Products } from 'src/app/models/products';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  products: Products[];
  displayedColumns: string[] = ['index', 'title', 'price', 'edit'];
  subscription: Subscription;
  dataSource: MatTableDataSource<Products> = new MatTableDataSource([]);

  constructor(private productService: ProductService) {
    this.subscription = productService.getAll().snapshotChanges().pipe(
      map(action => {
        return action.map(action => <Products>({ key: action.key, value: action.payload.val() }));
      })
    ).subscribe(x => {
      this.products = x;
      this.dataSource.data = x;
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filter(query: string) {
    this.dataSource = (query) ? new MatTableDataSource(this.products.filter(p => p.value.title.toLowerCase().includes(query.toLowerCase()))) :
      new MatTableDataSource(this.products);
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  sortData(sort: Sort){
    const data = this.products.slice();
    if(!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title': return this.compare(a.value.title.toLowerCase(), b.value.title.toLowerCase(), isAsc);
        case 'price': return this.compare(a.value.price, b.value.price, isAsc);
        default: return 0;
      }
    })
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  ngOnInit() {
  }

}
