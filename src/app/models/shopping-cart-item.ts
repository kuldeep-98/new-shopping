import { Products } from './products';

export class ShoppingCartItem {

    constructor(public product:Products, public quantity: number) {}

    get totalPrice() { return this.product.value.price * this.quantity }
}