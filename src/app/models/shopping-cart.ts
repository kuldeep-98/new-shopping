import { ShoppingCartItem } from './shopping-cart-item';
import { Products } from './products';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [productId:string]: ShoppingCartItem }){
        this.itemsMap = itemsMap || {};

        for(let productId in itemsMap) {
            let item = itemsMap[productId];
            this.items.push(new ShoppingCartItem(item.product,item.quantity));
        }
    }

    getQuantity(product: Products) {        
        let item = this.itemsMap[product.key];
        return item ? item.quantity: 0;
    }

    get totalPrice() {
        let totalPrice=0;
        for(let productId in this.items)
            totalPrice += this.items[productId].totalPrice;
        return totalPrice;
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.itemsMap)
            count += this.itemsMap[productId].quantity;
        return count;
    }
}