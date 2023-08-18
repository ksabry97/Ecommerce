import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../../../../models/cart';
import { Injectable } from '@angular/core';
export const CART_KEY = 'cart';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  // observing cart :
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getcart());
  // intializing cart :

  intialCart() {
    const cart: Cart = this.getcart();

    if (!cart) {
      const intial = {
        items: [],
      };
      const intialJson = JSON.stringify(intial);
      localStorage.setItem(CART_KEY, intialJson);
    }
  }

  //e emptying the cart
  emptyCart() {
    const intial = {
      items: [],
    };
    const intialJson = JSON.stringify(intial);
    localStorage.setItem(CART_KEY, intialJson);
    this.cart$.next(intial);
  }

  //getting cart :

  getcart(): Cart {
    const cartJson = localStorage.getItem(CART_KEY);
    if (cartJson) {
      const cart: Cart = JSON.parse(cartJson);
      return cart;
    } else {
      return new Cart(); // Return a new Cart instance or handle the absence of data appropriately.
    }
  }

  // add items to cart

  addItems(cartitem: CartItem, updateQuantity?: boolean): Cart {
    const cart = this.getcart();
    const itemExisted = cart.items.find(
      (item) => item.productId === cartitem.productId
    );
    if (itemExisted) {
      cart.items.map((item) => {
        if (item.productId === cartitem.productId) {
          if (updateQuantity) {
            item.quantity = cartitem.quantity;
          } else {
            item.quantity = item.quantity + cartitem.quantity;
          }
        }
      });
    } else {
      cart.items.push(cartitem);
    }
    const intialJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, intialJson);
    this.cart$.next(cart);
    return cart;
  }

  // delete items from cart :

  deleteItem(productId: string) {
    const cart = this.getcart();
    const newCart = cart.items?.filter((item) => item.productId !== productId);
    cart.items = newCart;
    const intialJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, intialJson);
    this.cart$.next(cart);
  }
}
