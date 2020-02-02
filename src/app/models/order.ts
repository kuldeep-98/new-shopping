import { ShoppingCart } from './shopping-cart';

export class Order {
    datePlaced: number;
    items: any[];

    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart){
        this.datePlaced = new Date().getTime();

        this.items = shoppingCart.items.map(i => {
            return {
              product: {
                title: i.product.value.title,
                imageUrl: i.product.value.imageUrl,
                price: i.product.value.price
              },
              quantity: i.quantity,
              totalPrice: i.totalPrice
            }
          });
    }
}