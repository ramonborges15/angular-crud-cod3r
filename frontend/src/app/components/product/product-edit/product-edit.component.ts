import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../product.service';
import { HeaderComponent } from '../../template/header/header.component';
import { HeaderService } from '../../template/header/header.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  product: Product = {
    name: '',
    price: 0
  };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private headerService: HeaderService
  ) {
    headerService.headerData = {
      title: 'Edição de Produtos',
      icon: 'edit',
      routeUrl: '/products'
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.productService.readById(id).subscribe((product) => {
      this.product = product;
    });
  }

  editProduct(): void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage('Produto editado com sucesso!')
      this.router.navigate(['products'])
    });
  }

  cancel(): void {
    this.router.navigate(['products']);
  }

}
