import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: any[] = [];
  errorMessage: string = '';
  successMessage: string = "";
  
  constructor(
    private http: HttpClient, 
    private router: Router
  ) { }


  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.http.get("http://localhost:9992/user/list").subscribe(
      (response: any) => {
        console.log(response.data)
        console.log("Users fetched successfully")
        this.users = response.data;
      },
      (error) => {
        console.error("An error occurred while fetching users:", error);
      }
    )
  }

  deleteUser(email: string){
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.http.post("http://localhost:9992/user/delete-user",{email}).subscribe(
        (response: any) => {
          this.successMessage = "Utilisateur supprimée avec succès.";
          setTimeout(() => {
            this.successMessage ="";
          }, 2000); // Masquer le message après 3 secondes
          this.users = this.users.filter((user) => user.email !== email); // Mise à jour de la liste localement
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'image :', error);
          this.errorMessage = "Une erreur s\'est produite lors de la suppression de l\'image.";
          setTimeout(() => {
            this.errorMessage ="";
          }, 10000); // Masquer le message après 3 secondes
        }
      );
    }
  }
}
