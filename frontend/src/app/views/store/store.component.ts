import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/components/product.service';
import { Product } from 'src/app/components/product/product.model';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService, private headerService: HeaderService) { 
    headerService.headerData = {
      title: 'Loja',
      icon: 'add_shopping_cart',
      routeUrl: '/loja'
    }
  }

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.products = products;
    });
  }

}
