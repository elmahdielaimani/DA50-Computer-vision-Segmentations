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


  // Charger les images depuis le backend
  loadImages() {
    this.imageService.getImage().subscribe(
      (res: any) => {
        this.images = res; // Assigner les images à la variable
      },
      (error) => {
        console.error('Erreur lors du chargement des images :', error);
      }
    );
  }

  // Supprimer une image
  deleteImage(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      this.imageService.deleteImage(id).subscribe(
        (res: any) => {
          this.successMessage = "Image supprimée avec succès.";
          setTimeout(() => {
            this.successMessage ="";
          }, 2000); // Masquer le message après 3 secondes
          // alert('Image supprimée avec succès.');
          this.images = this.images.filter((image) => image._id !== id); // Mise à jour de la liste localement
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'image :', error);
          this.errorMessage = "Une erreur s\'est produite lors de la suppression de l\'image.";
          setTimeout(() => {
            this.errorMessage ="";
          }, 10000); // Masquer le message après 3 secondes
          // alert('Une erreur s\'est produite lors de la suppression de l\'image.');
        }
      );
    }
  }

 

}
