import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  productFormGroup: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private productService: ProductService) {
    this.productFormGroup = this.formBuilder.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]]
    });
  }
  
  ngOnInit(): void {
  }

  createProduct(): void {
    if(this.productFormGroup.status == "VALID") {
      this.productService.create(this.productFormGroup.value).subscribe(() => {
        this.productService.showMessage('Produto cadastrado com sucesso!');
        this.router.navigate(['/products']);
        return;
      })
    }
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
