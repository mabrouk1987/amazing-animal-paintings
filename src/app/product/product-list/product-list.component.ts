import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from '../product.service';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  protected products: Product[] = [];
  protected filteredProducts: Product[] = [];
  protected sortOrder: string = '';

  constructor(
    private readonly productService: ProductService,
    private readonly cartService: CartService,
    private readonly snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.snackbar.open('Product added to cart', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    });
    console.log(`Product ${product.name} added to cart`);
  }

  applyFilter(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.trim().toLowerCase();

    this.filteredProducts = this.products.filter((product) => {
      return product.name.toLowerCase().includes(searchTerm);
    });

    this.sortProducts(this.sortOrder);
  }

  sortProducts(sortValue: string) {
    this.sortOrder = sortValue;

    if(this.sortOrder === 'priceLowHigh') {

      this.filteredProducts.sort((a, b) => a.price - b.price);

    } else if(this.sortOrder === 'priceHighLow') {

      this.filteredProducts.sort((a, b) => b.price - a.price);

    }
  }

}
