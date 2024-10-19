import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  firstname: string = "";
  lastname: string = "";
  email: string = "";
  password: string = "";

  // Variable pour afficher le message de succès
  successMessage: string = "";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  register() {
    let bodyData = {
      'firstname': this.firstname,
      'lastname': this.lastname,
      'email': this.email,
      'password': this.password,
    };
    console.log(bodyData);
    this.http.post("http://localhost:9992/user/create", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      
      // Afficher le message de succès
      this.successMessage = "Utilisateur inscrit avec succès";
      
      // Optionnel: masquer le message après quelques secondes
      setTimeout(() => {
        this.successMessage = "";
      }, 10000); // Masquer le message après 3 secondes
    });
  }

  save() {
    this.register();
  }
}
