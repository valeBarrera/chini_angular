import { Product } from './../models/product';
import { Category } from './../models/category';
import { Brand } from './../models/brand';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private brands: Brand[] = [];

  private categorys: Category[] = [];

  private popularProducts: Product[] = [];

  constructor() {}

  getCategory(): Category[] {
    return this.categorys;
  }

  getPopularProducts(): Product[] {
    return this.popularProducts;
  }
}
