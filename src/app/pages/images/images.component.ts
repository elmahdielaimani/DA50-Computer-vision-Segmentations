import { Component, OnInit } from '@angular/core';
import { ImageService } from 'app/image.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  errorMessage: string = '';
  successMessage: string = "";

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.loadImages(); // Charger les images au démarrage
  }
  images: any[] = []; // Tableau pour stocker les données des images
  searchText: string = ''; // Variable pour le champ de recherche
  totalPages: number = 0; // Nombre total de pages
currentPage: number = 1; // Page actuelle



  // Charger les images depuis le backend
  // loadImages() {
  //   this.imageService.getImage().subscribe(
  //     (res: any) => {
  //       this.images = res; // Assigner les images à la variable
  //     },
  //     (error) => {
  //       console.error('Erreur lors du chargement des images :', error);
  //     }
  //   );
  // }

  loadImages(page: number = 1, limit: number = 10) {
    this.imageService.getImages(page, limit).subscribe(
        (res: any) => {
            this.images = res.images;
            this.totalPages = res.totalPages; // Stocker le nombre total de pages
            this.currentPage = res.currentPage; // Page actuelle
        },
        (error) => {
            console.error('Erreur lors du chargement des images :', error);
        }
    );
}


  

 

}
