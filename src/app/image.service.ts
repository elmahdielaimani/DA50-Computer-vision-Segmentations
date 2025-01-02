import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseURL = 'http://localhost:9992/image';

  constructor(
    public fb: FormBuilder, 
    private http: HttpClient
  ) { }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.error?.error || 'Une erreur est survenue'));
  }

  getImagesByRole(page: number = 1, limit: number = 10, role: string): Observable<any> {
    const headers = new HttpHeaders().set('role', role);
    return this.http.get(`${this.baseURL}?page=${page}&limit=${limit}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Fonction pour obtenir une image par son ID
  getImageById(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${id}`);
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
    return this.http.post(`${this.baseURL}/annotations`, annotationsData).pipe(
      catchError(this.handleError)
    );

  }
}
  