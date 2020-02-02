import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './user.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { CategoryService } from './category.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { OrderService } from './order.service';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    LoginComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    MyOrdersComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    CustomFormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'login', component: LoginComponent },

      { path: 'check-out', component: CheckOutComponent, canActivate:[AuthGuardService] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate:[AuthGuardService] },
      { path: 'my/order', component: MyOrdersComponent, canActivate:[AuthGuardService] },

      { 
        path: 'admin/products/new', 
        component: ProductFormComponent,
        canActivate:[AuthGuardService, AdminAuthGuardService],
      },
      { 
        path: 'admin/products/:id', 
        component: ProductFormComponent,
        canActivate:[AuthGuardService, AdminAuthGuardService],
      },
      { 
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate:[AuthGuardService, AdminAuthGuardService],
      },
      { 
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate:[AuthGuardService, AdminAuthGuardService],
      },
    ]),
    BrowserAnimationsModule,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    AdminAuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
