import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";

  isLogin: boolean = true;
  errorMessage: string = "";

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // Vérifier si l'utilisateur est déjà connecté
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigateByUrl('dashboard');
    }
  }

  login() {
    let bodyData = {
      'email': this.email,
      'password': this.password,
    };

    this.http.post("http://localhost:9992/user/login", bodyData).subscribe((resultData: any) => {
      if (resultData.status) {
        // Stocker le token dans le localStorage
        localStorage.setItem('token', resultData.token);
        this.router.navigateByUrl('dashboard');
      } else {
        // Afficher le message d'erreur
        this.errorMessage = "E-mail ou mot de passe incorrect.";
        
        // Optionnel : masquer l'erreur après quelques secondes
        setTimeout(() => {
          this.errorMessage = "";
        }, 10000); // Masquer le message après 3 secondes
      }
    }, error => {
      // En cas d'erreur de la requête HTTP
      this.errorMessage = "Une erreur s'est produite lors de la connexion. Veuillez réessayer.";
    });
  }

  logout() {
    // Supprimer le token du localStorage et rediriger vers la page de login
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
