import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Product} from '../../models/product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = 'http://localhost:3000';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private httpClient: HttpClient) {
  }

  fetchProducts(page: number, limit: number) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.httpClient.get<Product[]>(`${this.baseUrl}/products`, {headers: this.headers, params: params})
  }

  saveProduct(formData: any) {
    return this.httpClient.post<any>(`${this.baseUrl}/products`, formData);
  }

  updateProduct(product: Product) {
    return this.httpClient.put<any>(`${this.baseUrl}/products`, product, {headers: this.headers});
  }

  deleteProduct(id: any) {
    return this.httpClient.delete<any>(`${this.baseUrl}/products/` + id, {headers: this.headers});
  }

}
