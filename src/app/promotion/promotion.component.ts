import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {
  user: any
  updatedUser = {
    email : '',
    role : ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Get the email from route params (if passed in the URL)
    const email = this.route.snapshot.paramMap.get('email');
    console.log(email)
    this.updatedUser.email = email
    this.loadUserByEmail(email);
  }

  loadUserByEmail(email: string): void {
    this.http.get(`http://localhost:9992/user/user-info/${email}`)
      .subscribe(
        (response: any) => {
          if (response.status) {
            this.user = response.data;
            console.log(this.user)
          } else {
            console.error('User not found');
          }
        },
        (error) => {
          console.error('Error fetching user info', error);
        }

      );
  }

  updateRole(newRole: string) {
    this.updatedUser.role = newRole;
    console.log('Updated Role : ', this.updatedUser.role);
  }

  onSubmit(): void {

    this.http.post(`http://localhost:9992/user/update-role`, this.updatedUser).subscribe((resultData: any) => {
      if(resultData.status){
        console.log('User role updated successfully');
        this.router.navigate(['/users']);
      }
      else{
        console.error('Failed to update user\'s role');
      }
    },
      (error) => {
        console.error('Error updating role: ', error);
        alert('An error occured while updating the role');
      }
    );
  }
}