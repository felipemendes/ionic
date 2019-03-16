import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  currentCategory: any;
  constructor(private http: HttpClient) {}

  fetchFeed(url) {
    return this.http.get(`${API_URL}/${url}`);
  }
}
