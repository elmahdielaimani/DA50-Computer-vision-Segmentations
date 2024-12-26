
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  baseURL = 'http://localhost:9992/image';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public fb: FormBuilder, private http: HttpClient) { }

  // Fonction pour obtenir les images avec pagination
  
  getImages(page: number = 1, limit: number = 10) {
    return this.http.get(`${this.baseURL}?page=${page}&limit=${limit}`);
  }
  

  // Fonction pour obtenir une image par son ID
  getImageById(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${id}`, { headers: this.headers });
  }
}

