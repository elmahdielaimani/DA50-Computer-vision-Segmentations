import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Récupérer le token du local storage

    if (token) {
      // Si le token existe, on autorise l'accès à la route
      return true;
    } else {
      // Si le token n'existe pas, on redirige vers la page de login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
