import { DesingLeaf } from './../models/desing-leaf';
import { ImageType } from './../models/image-type';
import { ElementState } from './../models/element-state';
import { CharactCategory } from './../models/charact-category';
import { Brand } from './../models/brand';
import { map } from 'rxjs/operators';
import { Category } from './../models/category';
import { environment } from './../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { faSquare, faGripLines, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class CatProdService {
  private currentCategorySubject: BehaviorSubject<Category[]>;
  public currentCategory: Observable<Category[]>;

  private states: ElementState[] = [
    { id: 1, name: 'ACTIVO' },
    { id: 0, name: 'NO ACTIVO' },
  ];

  private leafs: DesingLeaf[] = [
    { id: 1, name: 'Cuadrados', icon: faSquare },
    { id: 2, name: 'Puntos', icon: faEllipsisH },
    { id: 3, name: 'Líneas', icon: faGripLines },
  ];

  constructor(private http: HttpClient) {
    this.currentCategorySubject = new BehaviorSubject<Category[]>([]);
    this.currentCategory = this.currentCategorySubject.asObservable();
  }

  allTypeLeaf(): DesingLeaf[] {
    return this.leafs;
  }

  allElementStates(): ElementState[] {
    return this.states;
  }

  allCategory(): Observable<any> {
    const url = environment.urlApi + 'api/admin/category/all';
    return this.http.get(url);
  }

  allCategoryWithCharact(): Observable<any> {
    const url = environment.urlApi + 'api/admin/category/all/characteristics';
    return this.http.get(url);
  }

  createCategory(category: Category): Observable<any> {
    const url = environment.urlApi + 'api/admin/category/create';
    return this.http.post(url, category).pipe(
      map((response: any) => {
        if (response.state) {
          let cats: Category[] = response.categorys;
          this.currentCategorySubject.next(cats);
        }
        return response;
      })
    );
  }

  editCategory(category: Category): Observable<any> {
    const url = environment.urlApi + 'api/admin/category/edit';
    return this.http.post(url, category).pipe(
      map((response: any) => {
        if (response.state) {
          let cats: Category[] = response.categorys;
          this.currentCategorySubject.next(cats);
        }
        return response;
      })
    );
  }

  deleteCategory(category: Category): Observable<any> {
    const url = environment.urlApi + 'api/admin/category/delete';
    return this.http.post(url, category).pipe(
      map((response: any) => {
        if (response.state) {
          let cats: Category[] = response.categorys;
          this.currentCategorySubject.next(cats);
        }
        return response;
      })
    );
  }
  /* START - BRANDS */
  allBrand(): Observable<any> {
    const url = environment.urlApi + 'api/admin/brand/all';
    return this.http.get(url);
  }

  createBrand(brand: Brand): Observable<any> {
    const url = environment.urlApi + 'api/admin/brand/create';
    return this.http.post(url, brand);
  }

  editBrand(brand: Brand): Observable<any> {
    const url = environment.urlApi + 'api/admin/brand/edit';
    return this.http.post(url, brand);
  }

  deleteBrand(brand: Brand): Observable<any> {
    const url = environment.urlApi + 'api/admin/brand/delete';
    return this.http.post(url, brand);
  }
  /* END - BRANDS */

  /*START - PRODUCTS */
  allProduct(): Observable<any> {
    const url = environment.urlApi + 'api/admin/product/all';
    return this.http.get(url);
  }

  saveCharacteristics(info): Observable<any> {
    const url = environment.urlApi + 'api/admin/product/characteristic/save';
    return this.http.post(url, info);
  }

  createProduct(form: FormData): Observable<any> {
    const url = environment.urlApi + 'api/admin/product/create';
    return this.http.post(url, form);
  }

  editProduct(form: FormData): Observable<any> {
    const url = environment.urlApi + 'api/admin/product/edit';
    return this.http.post(url, form);
  }

  deleteProduct(form: FormData): Observable<any> {
    const url = environment.urlApi + 'api/admin/product/delete';
    return this.http.post(url, form);
  }
  /*END - PRODUCTS */

  /*START - IMAGE-SIDE */
  allImageSide(): Observable<any> {
    const url = environment.urlApi + 'api/admin/image-side/all';
    return this.http.get(url);
  }
  /*END - IMAGE-SIDE */

  /*START - IMAGE-TYPES */
  allImageType(): Observable<any> {
    const url = environment.urlApi + 'api/admin/image-type/all';
    return this.http.get(url);
  }

  createImageType(imageType: ImageType): Observable<any> {
    const url = environment.urlApi + 'api/admin/image-type/create';
    return this.http.post(url, imageType);
  }

  editImageType(imageType: ImageType): Observable<any> {
    const url = environment.urlApi + 'api/admin/image-type/edit';
    return this.http.post(url, imageType);
  }

  deleteImageType(imageType: ImageType): Observable<any> {
    const url = environment.urlApi + 'api/admin/image-type/delete';
    return this.http.post(url, imageType);
  }
  /*END - IMAGE-TYPES */

  allCharactCategory(): Observable<any> {
    const url = environment.urlApi + 'api/admin/category/characteristic/all';
    return this.http.get(url);
  }

  allCharactCategoryOfCategory(categoryId: number): Observable<any> {
    const url =
      environment.urlApi +
      'api/admin/category/characteristic/all/' +
      categoryId;
    return this.http.get(url);
  }

  createCharactCategory(charCat: CharactCategory): Observable<any> {
    const url = environment.urlApi + 'api/admin/category/characteristic/create';
    return this.http.post(url, charCat);
  }

  editCharactCategory(charCat: CharactCategory): Observable<any> {
    const url = environment.urlApi + 'api/admin/category/characteristic/edit';
    return this.http.post(url, charCat);
  }

  deleteCharactCategory(charCat: CharactCategory): Observable<any> {
    const url = environment.urlApi + 'api/admin/category/characteristic/delete';
    return this.http.post(url, charCat);
  }

  allTypeCharactCategory(): Observable<any> {
    const url =
      environment.urlApi + 'api/admin/category/characteristic/type/all';
    return this.http.get(url);
  }

  createTypeCharactCategory(typeCharact: FormData): Observable<any> {
    const url =
      environment.urlApi + 'api/admin/category/characteristic/type/create';
    return this.http.post(url, typeCharact);
  }

  editTypeCharactCategory(typeCharact: FormData): Observable<any> {
    const url =
      environment.urlApi + 'api/admin/category/characteristic/type/edit';
    return this.http.post(url, typeCharact);
  }

  deleteTypeCharactCategory(typeCharact: FormData): Observable<any> {
    const url =
      environment.urlApi + 'api/admin/category/characteristic/type/delete';
    return this.http.post(url, typeCharact);
  }
}
