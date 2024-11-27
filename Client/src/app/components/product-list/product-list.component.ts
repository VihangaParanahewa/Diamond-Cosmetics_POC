import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product/product';
import {ProductService} from '../../services/product/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: false,

  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  protected successMessage: string = '';
  protected errorMessage: string = '';
  protected products: Product[] = [];
  protected totalItems: number = 0;  // Total count of products in the database
  protected pageSize: number = 6;  // Number of products per page
  protected currentPage: number = 1;  // Current page number
  protected totalPages: number = 0;
  protected selectedProductId: any;

  constructor(private productService: ProductService,
              private router: Router) {
  }

  ngOnInit() {
    this.fetchProducts();
  }


  fetchProducts(): void {
    this.productService.fetchProducts(this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
        this.handleProductData(response);
      },
      error: (err) => {
        this.handleError(err);
      },
      complete: () => {
        console.log('Products fetch completed.');
      }
    });
  }

  private handleProductData(response: any): void {
    this.products = response.data;
    console.log(this.products);
    this.totalItems = response.total;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }

  private handleError(error: any): void {
    this.errorMessage = error;
    console.error('Error fetching products:', error);
    setTimeout(() => {
      this.errorMessage = '';
    }, 5000);
  }

  // Method to go to the next page
  nextPage(): void {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.fetchProducts();
    }
  }

  // Method to go to the previous page
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchProducts();
    }
  }

  // Method to jump to a specific page
  goToPage(page: number): void {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.fetchProducts();
    }
  }

  viewProduct(productInfo: Product): void {
    this.router.navigate(['/product-view'], {
      state: {product: productInfo} // Passing object through state
    }).then();
  }

  editProduct(productInfo: Product) {
    this.router.navigate(['/product-edit'], {
      state: {product: productInfo} // Passing object through state
    }).then();
  }

  openModal(productId: any) {
    this.selectedProductId = productId;
  }

  confirmDelete() {
    if (this.selectedProductId) {
      this.deleteProduct(this.selectedProductId);
      this.selectedProductId = null;
    }
  }

  deleteProduct(productId: any) {
    this.productService.deleteProduct(productId).subscribe({
      next: (response: any) => {
        this.successMessage = response.message;

        // Re-fetch the products to update the view
        this.fetchProducts();

        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      },
      error: (err) => {
        this.handleError(err);
      },
      complete: () => {
        console.log('Products Deleted.');
      }
    });
  }

  getImageUrl(imageUrl: any): string {
    const baseUrl = 'http://localhost:3000'; // Replace with your backend's base URL
    return `${baseUrl}${imageUrl}`;
  }
}
