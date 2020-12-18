import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from '../../product.service';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = []
  displayedColumns = ['id', 'name', 'price', 'action']

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.products = products
    })
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(ProductDeleteComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.productService.delete(id).subscribe(() => {
          this.router.navigate(['products'])
          .then(() => {
            window.location.reload();
          })
          this.productService.showMessage("Produto removido com sucesso!");
        })
      }
    });
  }

}
