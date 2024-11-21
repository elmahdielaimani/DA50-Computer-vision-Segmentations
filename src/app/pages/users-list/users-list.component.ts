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
}
