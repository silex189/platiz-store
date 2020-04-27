import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Product } from './../../models/product.model';

import * as Sentry from '@sentry/browser';

import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

interface User {
  email: string;
  gender: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(`${environment.url_api}/products/`);
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${environment.url_api}/products/${id}`);
  }

  createProduct(product: Product) {
    return this.http.post<Product>(`${environment.url_api}/products`, product);
  }

  updateProduct(id: string, changes: Partial<Product>) {
    return this.http.put(`${environment.url_api}/products/${id}`, changes);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.url_api}/products/${id}`)
      .pipe(
        catchError(this.handleErrors)
      );
  }

  getRandomUsers(): Observable<User[]> {
    return this.http.get('https://dsgfdsgfagfgsgasggdafdag.me/api/?results=2')
    .pipe(
      retry(3),
      catchError(this.handleErrors),
      map((response: any) => response.results as User[])
    );
  }

  getFile() {
    return this.http.get('assets/files/test.txt', {responseType: 'text'});
  }

  private handleErrors(error: HttpErrorResponse) {
    console.log(error);
    Sentry.captureException(error);
    return throwError('ups, algo salio mal');
  }
}
