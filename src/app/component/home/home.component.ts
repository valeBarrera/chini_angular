import { CatProdService } from './../../services/cat-prod.service';
import { TestService } from './../../services/test.service';
import { Category } from './../../models/category';
import { Brand } from './../../models/brand';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  popularProducts: Product[] = [];

  constructor(private services: TestService, private catProdServices: CatProdService) {}

  ngOnInit(): void {
    this.popularProducts = this.services.getPopularProducts();
  }
}
