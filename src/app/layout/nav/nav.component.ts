import { CatProdService } from './../../services/cat-prod.service';
import { TestService } from './../../services/test.service';
import { Category } from './../../models/category';
import { AuthenticationService } from './../../shared/authentication.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export enum Rol {
  User = 'user',
  Admin = 'admin',
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  currentUser: User;

  iconShop = faShoppingCart;
  cantidadItems: number = 0;

  categorys: Category[] = [];

  constructor(
    private catProdServices: CatProdService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    this.catProdServices.currentCategory.subscribe((x) => (this.categorys = x));
  }

  ngOnInit(): void {
    this.catProdServices.allCategory().subscribe((response) => {
      if (response.state){
        this.categorys = response.categorys;
      }
    });
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role.name === Rol.Admin;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
