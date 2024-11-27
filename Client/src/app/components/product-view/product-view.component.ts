import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../models/product/product';

@Component({
  selector: 'app-product-view',
  standalone: false,

  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent implements OnInit {

  protected product : Product = {
    name: '',
    categoryId: 0,
    description: '',
    directions: '',
    price: 0,
    in_stock: 0,
    categoryName: ''
  };

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.product = history.state.product;
    console.log(this.product);
  }

  getImageUrl(image_url: string) {
    const baseUrl = 'http://localhost:3000'; // Replace with your backend's base URL
    return `${baseUrl}${image_url}`;
  }
}
