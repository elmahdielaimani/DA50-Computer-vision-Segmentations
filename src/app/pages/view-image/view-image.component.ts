import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'app/image.service';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss']
})
export class ViewImageComponent implements OnInit, AfterViewInit {
  image: any;
  errorMessage: string = '';
  objects: any[] = [];
  imgWidth = 0;
  imgHeight = 0;
          
  allowedLabels: string[] = ['car', 'traffic sign', 'buildings', 'road', 'person', 'vegetation','building','pole','fence','bicycle'];

  showModal = false;
  selectedObject: any = null;
  selectedLevel: 'high' | 'medium' | 'low' = 'high';
  comment: string = '';

  @ViewChild('imageElement', { static: false }) imageElement!: ElementRef<HTMLImageElement>;

  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getImageById(id);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.imageElement) {
        this.imgWidth = this.imageElement.nativeElement.offsetWidth;
        this.imgHeight = this.imageElement.nativeElement.offsetHeight;
      }
    }, 100);
  }

  getImageById(id: string) {
    this.imageService.getImageById(id).subscribe({
      next: (res: any) => {
        this.image = res;
        this.objects = res.metadata.objects;
        setTimeout(() => {
          const imgElement = this.imageElement.nativeElement;
          this.imgWidth = imgElement.offsetWidth;
          this.imgHeight = imgElement.offsetHeight;
        }, 100);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l\'image :', error);
        this.errorMessage = error.message || 'Image introuvable.';
      }
    });
  }

  getScaledPolygonPoints(polygon: number[][]): string {
    if (!this.image) return '';
    const scaleX = this.imgWidth / this.image.metadata.imgWidth;
    const scaleY = this.imgHeight / this.image.metadata.imgHeight;

    return polygon
      .map(([x, y]) => `${x * scaleX},${y * scaleY}`)
      .join(' ');
  }

  getPolygonColor(obj: any): string {
    switch (obj.importanceLevel) {
      case 'high':
        return 'rgba(255, 0, 0, 0.5)';
      case 'medium':
        return 'rgba(255, 165, 0, 0.5)';
      case 'low':
        return 'rgba(0, 255, 0, 0.5)';
      default:
        return 'rgba(128, 128, 128, 0.3)';
    }
  }

  getPolygonStrokeColor(obj: any): string {
    switch (obj.importanceLevel) {
      case 'high':
        return '#ff0000';
      case 'medium':
        return '#ffa500';
      case 'low':
        return '#00ff00';
      default:
        return '#808080';
    }
  }

  getPolygonCenter(polygon: number[][]): { x: number, y: number } {
    if (!polygon || polygon.length === 0) return { x: 0, y: 0 };

    const scaleX = this.imgWidth / this.image.metadata.imgWidth;
    const scaleY = this.imgHeight / this.image.metadata.imgHeight;

    let sumX = 0, sumY = 0;
    polygon.forEach(([x, y]) => {
      sumX += x * scaleX;
      sumY += y * scaleY;
    });

    return {
      x: sumX / polygon.length,
      y: sumY / polygon.length
    };
  }

  getTextColor(obj: any): string {
    switch (obj.importanceLevel) {
      case 'high':
        return '#ff0000';
      case 'medium':
        return '#ffa500';
      case 'low':
        return '#008000';
      default:
        return '#808080';
    }
  }

  handlePolygonClick(obj: any) {
    this.selectedObject = obj;
    this.selectedLevel = obj.importanceLevel || 'high';
    this.comment = obj.comment || '';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedObject = null;
    this.selectedLevel = 'high';
    this.comment = '';
  }

  saveAnnotation() {
    if (this.selectedObject && this.image?._id) {
      this.selectedObject.importanceLevel = this.selectedLevel;
      this.selectedObject.comment = this.comment;
  
      const userId = localStorage.getItem('userId'); // Vérification de l'ID utilisateur
  
      if (!userId) {
        alert('Utilisateur non connecté.');
        return;
      }
  
      const annotationsData = {
        imageId: this.image._id,
        userId, // Ajout explicite de l'ID utilisateur
        objects: this.objects.map(obj => ({
          label: obj.label,
          importanceLevel: obj.importanceLevel || '',
          comment: obj.comment || '',
          polygon: obj.polygon
        }))
      };
  
      this.imageService.saveAnnotations(annotationsData).subscribe({
        next: () => {
          console.log('Annotations saved successfully');
          this.closeModal();
        },
        error: (error) => {
          console.error('Error saving annotations:', error);
          alert('Erreur lors de la sauvegarde des annotations: ' + error.message);
        }
      });
    }
  }
  
  
  downloadAnnotatedImage() {
    if (this.image?._id) {
      this.imageService.downloadAnnotatedImage(this.image._id)
        .subscribe({
          next: (blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${this.image.nom}_annotated.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          },
          error: (error) => {
            console.error('Error downloading image:', error);
            alert('Erreur lors du téléchargement de l\'image: ' + error.message);
          }
        });
    }
  }
}

