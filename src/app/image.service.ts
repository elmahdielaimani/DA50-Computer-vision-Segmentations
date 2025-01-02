import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  baseURL = 'http://localhost:9992/image';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    public fb: FormBuilder, 
    private http: HttpClient
  ) { }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.error?.error || 'Une erreur est survenue'));
  }

  getImages(page: number = 1, limit: number = 10) {
    return this.http.get(`${this.baseURL}?page=${page}&limit=${limit}`).pipe(
      catchError(this.handleError)
    );
  }

  getImageById(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${id}`, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }

  downloadAnnotatedImage(imageId: string): Observable<Blob> {
    return this.http.get(`${this.baseURL}/${imageId}/download`, {
      responseType: 'blob',
      observe: 'response'
    }).pipe(
      tap(response => {
        if (!(response.body instanceof Blob)) {
          throw new Error('Response is not a valid image');
        }
      }),
      map(response => response.body as Blob),
      catchError(this.handleError)
    );
  }

  saveAnnotations(annotationsData: any): Observable<any> {
    return this.http.post(`${this.baseURL}/annotations`, annotationsData, { 
      headers: this.headers 
    }).pipe(
      catchError(this.handleError)
    );
  }
}

