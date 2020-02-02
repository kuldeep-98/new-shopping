import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { AngularFireObject } from '@angular/fire/database';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  public isCollapsed=true;
  appUser: AppUser;
  cart$: Observable<ShoppingCart>
  constructor(public auth: AuthService, private cartService:ShoppingCartService) { 
  }


  logout(){
    this.isCollapsed = !this.isCollapsed;
    this.auth.logout();
  }

  async ngOnInit(){
    this.auth.appUser$.subscribe(user=>this.appUser=user);

    this.cart$ = await this.cartService.getCart();
  }
}
