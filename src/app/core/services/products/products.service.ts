import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './../../models/product.model';

import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(
    private htpp: HttpClient
  ) { }

  getAllProducts() {
    return this.htpp.get<Product[]>(`${environment.url_api}/products/`);
  }

  getProduct(id: string) {
    return this.htpp.get<Product>(`${environment.url_api}/products/${id}`);
  }

  createProduct(product: Product) {
    return this.htpp.post<Product>(`${environment.url_api}/products`, product);
  }

  updateProduct(id: string, changes: Partial<Product>) {
    return this.htpp.put(`${environment.url_api}/products/${id}`, changes);
  }

  deleteProduct(id: string) {
    return this.htpp.delete(`${environment.url_api}/products/${id}`);
  }
}
