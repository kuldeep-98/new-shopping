import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public isCollapsed=true;
  appUser: AppUser;
  constructor(public auth: AuthService) { 
    auth.appUser$.subscribe(user=>this.appUser=user);
  }


  logout(){
    this.isCollapsed = !this.isCollapsed;
    this.auth.logout();
  }
}
