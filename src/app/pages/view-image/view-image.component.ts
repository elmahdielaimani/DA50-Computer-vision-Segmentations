import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'app/image.service';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss']
})
export class ViewImageComponent implements OnInit, AfterViewInit {
  image: any; // Contient les informations de l'image
  errorMessage: string = ''; // Message d'erreur
  objects: any[] = []; // Objets pour les polygones
  imgWidth = 0; // Largeur affichée de l'image
  imgHeight = 0; // Hauteur affichée de l'image

  @ViewChild('imageElement', { static: false }) imageElement!: ElementRef<HTMLImageElement>;

  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'image depuis l'URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getImageById(id);
    }
  }

  ngAfterViewInit(): void {
    // Écouter les changements de taille de l'image après affichage
    setTimeout(() => {
      if (this.imageElement) {
        this.imgWidth = this.imageElement.nativeElement.offsetWidth;
        this.imgHeight = this.imageElement.nativeElement.offsetHeight;
      }
    }, 100);
  }

  // Récupérer les informations de l'image
  getImageById(id: string) {
    this.imageService.getImageById(id).subscribe(
      (res: any) => {
        this.image = res;
        this.objects = res.metadata.objects;

        // Définir les dimensions de l'image après réception
        setTimeout(() => {
          const imgElement = this.imageElement.nativeElement;
          this.imgWidth = imgElement.offsetWidth;
          this.imgHeight = imgElement.offsetHeight;
        }, 100);
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'image :', error);
        this.errorMessage = 'Image introuvable.';
      }
    );
  }

  // Adapter les polygones à la taille affichée
  getScaledPolygonPoints(polygon: number[][]): string {
    if (!this.image) return '';
    const scaleX = this.imgWidth / this.image.metadata.imgWidth;
    const scaleY = this.imgHeight / this.image.metadata.imgHeight;

    return polygon
      .map(([x, y]) => `${x * scaleX},${y * scaleY}`)
      .join(' ');
  }

  // Clic sur un polygone
  handlePolygonClick(label: string) {
    alert(`Vous avez cliqué sur l'objet : ${label}`);
  }
}
