import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '' },
    { path: '/images', title: 'Images', icon: 'nc-image', class: '' },
    { path: '/user', title: 'Mon profil', icon: 'nc-single-02', class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {
    public menuItems: RouteInfo[];
    userId: string | null = null;
    user: any = {}; // To store user information
    role: string = '';
    errorMessage: string = '';

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        // Retrieve the userId from localStorage
        this.userId = localStorage.getItem('userId');

        if (this.userId) {
            this.getUserInfo(this.userId);
        }

        // Initialize menu items with default routes
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    getUserInfo(userId: string) {
        this.http.get(`http://localhost:9992/user/getUser/${userId}`).subscribe(
            (response: any) => {
                if (response.status) {
                    this.user = response.data; // Store user data
                    this.role = this.user.role;

                    // Dynamically add the 'user-list' route for administrators
                    if (this.role === 'administrator') {
                        this.menuItems.push({
                            path: '/user-list',
                            title: 'Liste Utilisateurs',
                            icon: 'nc-badge',
                            class: '',
                        });
                    }
                } else {
                    this.errorMessage =
                        'Erreur lors de la récupération des données utilisateur';
                }
            },
            (error) => {
                this.errorMessage = 'Erreur serveur, veuillez réessayer plus tard';
            }
        );
    }
}
