import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { switchMap} from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ProductsService } from './../../../core/services/products/products.service';
import { Product } from './../../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product$: Observable<Product>;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.product$ = this.route.params.
    pipe(
      switchMap((params: Params) => {
        return this.productsService.getProduct(params.id);
      })
    );
  }


  createProduct() {
    const newProduct: Product = {
      id: '222',
      title: 'nuevo desde Angular',
      image: 'assets/images/banner-1.jpg',
      price: 3000,
      description: 'nuevo producto'
    };

    this.productsService.createProduct(newProduct)
      .subscribe(newProduct => {
        console.log(newProduct);
      })
  }

  updateProduct() {
    const updateProduct: Partial<Product> = {
      price: 555555,
      description: 'edicion titulo'
    };

    this.productsService.updateProduct('2', updateProduct)
      .subscribe(product => {
        console.log(product);
      })
  }

  deleteProduct() {
    this.productsService.deleteProduct('222')
      .subscribe(rta => {
        console.log(rta);
      })
  }

}
