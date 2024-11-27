import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from '../../models/product/product';
import {Category} from '../../models/category/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl: string = 'http://localhost:3000';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private httpClient: HttpClient) {
  }

  fetchProductCategories() {
    return this.httpClient.get<Category[]>(`${this.baseUrl}/categories`, {headers: this.headers})
  }
}
