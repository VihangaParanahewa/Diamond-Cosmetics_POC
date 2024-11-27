import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product/product';
import {ActivatedRoute} from '@angular/router';
import {Category} from '../../models/category/category';
import {CategoryService} from '../../services/category/category.service';
import {ProductService} from '../../services/product/product.service';

@Component({
  selector: 'app-product-edit',
  standalone: false,

  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {

  protected successMessage: string = '';
  protected errorMessage: string = '';
  protected categories: Category[] = [];
  protected product : Product = {
    name: '',
    categoryId: 0,
    description: '',
    directions: '',
    price: 0,
    in_stock: 0,
    categoryName: ''
  };

  constructor(private route: ActivatedRoute,
              private categoryService: CategoryService,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.fetchProductCategories();
    this.product = history.state.product;
    console.log(this.product);
  }

  fetchProductCategories(){
    this.categoryService.fetchProductCategories().subscribe({
      next: (response: Category[]) => {
        this.handleCategoryData(response);
      },
      error: (err) => {
        this.handleError(err);
      },
      complete: () => {
        console.log('Category List fetch completed.');
      }
    });
  }

  private handleCategoryData(response: Category[]): void {
    this.categories = response;
  }

  private handleError(error: any): void {
    console.error('Error Updating products:', error);
    this.errorMessage = error;
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form submitted successfully:', this.product);
      this.updateProduct(this.product);
    }
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(product).subscribe({
      next: (response: any) => {
        this.successMessage = response.message;
      },
      error: (err) => {
        this.handleError(err);
      },
      complete: () => {
        console.log('Product Updated.');
      }
    });
  }

}
