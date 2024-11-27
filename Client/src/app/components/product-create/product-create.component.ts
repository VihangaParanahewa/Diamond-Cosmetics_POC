import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product/product';
import {CategoryService} from '../../services/category/category.service';
import {Category} from '../../models/category/category';
import {ProductService} from '../../services/product/product.service';

@Component({
  selector: 'app-product-create',
  standalone: false,

  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit {

  protected successMessage: string = '';
  protected errorMessage: string = '';
  protected categories: Category[] = [];
  protected product: Product = {
    name: '',
    categoryId: null,
    description: '',
    directions: '',
    price: 0,
    in_stock: 0,
    categoryName: '',
    image_url: '',
    imageFile: null
  };
  protected imageErrorMessage: string = '';

  constructor(private categoryService: CategoryService,
              private productService: ProductService) {
  }
  ngOnInit() {
    this.fetchProductCategories();
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

  saveProduct() {

    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('categoryId', this.product.categoryId?.toString() ?? '');
    formData.append('description', this.product.description);
    formData.append('directions', this.product.directions);
    formData.append('price', this.product.price.toString());
    formData.append('in_stock', this.product.in_stock.toString());
    if (this.product.imageFile) {
      formData.append('imageFile', this.product.imageFile);
    }

    this.productService.saveProduct(formData).subscribe({
      next: (response: any) => {
        this.displaySuccessMessage(response.message);
      },
      error: (err) => {
        this.handleError(err);
      },
      complete: () => {
        console.log('Product Creation completed.');
      }
    });
  }

  private displaySuccessMessage(message: string) {
    this.resetProductDetails()
    this.successMessage = message;
  }

  private handleCategoryData(response: Category[]): void {
   this.categories = response;
  }

  private handleError(error: any): void {
    console.error('Error fetching products:', error);
    this.errorMessage = error;
  }

  private resetProductDetails() {
    this.product = {
      name: '',
      categoryId: null,
      description: '',
      directions: '',
      price: 0,
      in_stock: 0,
      categoryName: '',
      image_url: '',
    }
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.debug('Form submitted successfully:', this.product);
      this.saveProduct();
    }
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];

    // Reset any existing error messages
    this.imageErrorMessage = '';

    // Validate file
    if (file) {
      // Check file type (accepts only images)
      if (!file.type.startsWith('image/')) {
        this.imageErrorMessage = 'Only image files are allowed.';
        this.product.imageFile = null;
        return;
      }

      // Check file size (e.g., limit to 2MB)
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        this.imageErrorMessage = 'File size must be less than 2MB.';
        this.product.imageFile = null;
        return;
      }

      // If valid, assign the file to the product object
      this.product.imageFile = file;
    }
  }
}
