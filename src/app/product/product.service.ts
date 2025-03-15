import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl + '/products';

  constructor(private readonly http: HttpClient) { }

  getProducts():Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
