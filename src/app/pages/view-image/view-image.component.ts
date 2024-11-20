import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'app/image.service';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss']
})
export class ViewImageComponent implements OnInit {

  image: any; // Stocker l'image à afficher
  errorMessage: string = ''; // Message d'erreur si l'image n'est pas trouvée
  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    // Récupérer l'ID de l'image depuis l'URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getImageById(id);
    }
  }

   // Récupérer l'image à partir de l'ID
   getImageById(id: string) {
    this.imageService.getImageById(id).subscribe(
      (res: any) => {
        this.image = res;
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'image :', error);
        this.errorMessage = 'Image introuvable.';
      }
    );
  }

}
