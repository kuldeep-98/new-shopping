import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Products } from './models/products';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart():Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges().pipe(
      map(x=> new ShoppingCart(x.payload.val()['items'])
    ));
  }

  async addToCart(product:Products) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Products) {
    this.updateItemQuantity(product, -1)
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime() 
    });
  }

  private getItem(cartId:string, productId:string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

  }

  private async updateItemQuantity(product:Products, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId,product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe(item=> {

      if(item.payload.exists()) {
        let q = (item.payload.val()['quantity'] || 0) + change;
        if(q === 0) item$.remove();
        else
          item$.update({ quantity: q});
      }
      else item$.set({ product: product, quantity: 1});
    });
  }

}
