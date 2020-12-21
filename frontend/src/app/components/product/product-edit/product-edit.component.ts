import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  productFormGroup: FormGroup;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private headerService: HeaderService,
    private formBuilder: FormBuilder
  ) {
    headerService.headerData = {
      title: 'Edição de Produtos',
      icon: 'edit',
      routeUrl: '/products'
    }

    this.productFormGroup = this.formBuilder.group({
      id: [],
      name: [null, Validators.required],
      price: [null, Validators.required]
    });    
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.productService.readById(id).subscribe(product => {
      this.productFormGroup.setValue(product);
    });
  }

  editProduct(): void {
    console.log("antes do valid");
    
    if (this.productFormGroup.status == "VALID") {
      console.log("depois do valid");
      this.productService.update(this.productFormGroup.value).subscribe(() => {
        this.productService.showMessage('Produto editado com sucesso!')
        this.router.navigate(['products'])
      });
    }
  }

  cancel(): void {
    this.router.navigate(['products']);
  }

}
