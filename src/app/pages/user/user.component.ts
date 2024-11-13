import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{

    userId: string | null = null;
    user: any = {}; // Pour stocker les informations de l'utilisateur
    errorMessage: string = '';
    
  // Variable pour afficher le message de succès
    successMessage: string = "";

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router
      ) {}
    ngOnInit(){
         // Récupérer l'ID de l'utilisateur (par exemple, à partir du stockage local)
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.getUserInfo(this.userId);
     
    }
    }

    // Récupérer les informations de l'utilisateur
  getUserInfo(userId: string) {
    this.http.get(`http://localhost:9992/user/getUser/${userId}`).subscribe(
      (response: any) => {
        if (response.status) {
          this.user = response.data; // Stocker les données de l'utilisateur
          this.user.password="";
          console.log(this.user)
        } else {
          this.errorMessage = 'Erreur lors de la récupération des données utilisateur';
        }
      },
      (error) => {
        this.errorMessage = 'Erreur serveur, veuillez réessayer plus tard';
      }
    );
  }


  // Soumettre les modifications
  updateProfile() {
    this.http.patch(`http://localhost:9992/user/update/${this.userId}`, this.user).subscribe(
      (response: any) => {
        if (response.status) {
          // Afficher le message de succès
      this.successMessage = "Profil mis à jour avec succès !";
      
      // Optionnel: masquer le message après quelques secondes
      setTimeout(() => {
        this.successMessage = "";
      }, 10000); 
        } else {
          this.errorMessage = "E-mail ou mot de passe incorrect.";
        
          // Optionnel : masquer l'erreur après quelques secondes
          setTimeout(() => {
            this.errorMessage = "";
          }, 10000); // Masquer le message après 3 secondes
        }
      },
      (error) => {
        this.errorMessage = 'Erreur serveur, veuillez réessayer plus tard';
      }
    );
  }
}
    

