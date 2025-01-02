import { Component, OnInit } from '@angular/core';
import { ImageService } from 'app/image.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  errorMessage: string = '';
  successMessage: string = '';
  images: any[] = []; // Tableau pour stocker les données des images
  searchText: string = ''; // Variable pour le champ de recherche
  totalPages: number = 0; // Nombre total de pages
  currentPage: number = 1; // Page actuelle
  userRole: string = ''; // Rôle de l'utilisateur (superviseur/utilisateur)

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    // Récupérer le rôle de l'utilisateur (par exemple, depuis le localStorage ou une API)
    this.userRole = localStorage.getItem('role') || 'utilisateur'; // Par défaut, utilisateur
    this.loadImages(); // Charger les images au démarrage
  }

  // Charger les images depuis le backend
  loadImages(page: number = 1, limit: number = 10) {
    this.imageService.getImagesByRole(page, limit, this.userRole).subscribe(
      (res: any) => {
        this.images = res.images;
        this.totalPages = res.totalPages; // Stocker le nombre total de pages
        this.currentPage = res.currentPage; // Page actuelle
      },
      (error) => {
        console.error('Erreur lors du chargement des images :', error);
        this.errorMessage = 'Erreur lors du chargement des images.';
      }
    );
  }

  // Naviguer vers la page suivante
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.loadImages(this.currentPage + 1);
    }
  }

  // Naviguer vers la page précédente
  previousPage() {
    if (this.currentPage > 1) {
      this.loadImages(this.currentPage - 1);
    }
  }
}
