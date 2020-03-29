// import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  DoCheck
} from '@angular/core';

import { Product } from '../product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: [ './product.component.scss']
})
export class ProductComponent implements OnInit, DoCheck, OnDestroy {
  @Input() product: Product;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();

  today = new Date();

  constructor() {
    console.log('1. constructor');
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log("2. onChanges");
  // }

  ngOnInit() {
    console.log('3. onInit');
  }

  ngDoCheck() {
    console.log('4. ngDoCheck');
  }

  ngOnDestroy() {
    console.log('5.s onDestroy');
  }

  addCart() {
    console.log('añadir al carrito');
    this.productClicked.emit(this.product.id);
  }
}
