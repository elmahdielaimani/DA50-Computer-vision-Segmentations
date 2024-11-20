import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'app/image.service';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.scss']
})
export class EditImageComponent implements OnInit {
  imageId!: string;
  imagePreview: any;
  errorMessage: string = '';
  successMessage: string = '';
  constructor( 
    public imageService: ImageService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
     // Récupérer l'ID de l'image depuis l'URL
     this.imageId = this.route.snapshot.paramMap.get('id')!;
     this.loadImage();
     

}

loadImage() {
  this.imageService.getImageById(this.imageId).subscribe(
    (res: any) => {
      this.imageService.form.patchValue({
        _id: res._id,
        nom: res.nom,
      });
      this.imagePreview = res.image;
    },
    (error) => {
      console.error('Erreur lors du chargement de l\'image :', error);
      this.errorMessage = 'Erreur lors du chargement de l\'image.';
    }
  );
}

onSelectImage(event: any) {
  const file = (event.target as HTMLInputElement).files[0];
  this.imageService.form.patchValue({ image: file });

  const allowedFileType = ['image/png', 'image/jpg', 'image/jpeg'];
  if (file && allowedFileType.includes(file.type)) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}

onSubmit() {
  this.imageService
    .updateImage(
      this.imageId,
      this.imageService.form.value,
      this.imageService.form.value.image
    )
    .subscribe(
      (res: any) => {
        this.successMessage = 'Image modifiée avec succès !';
        setTimeout(() => {
          this.router.navigate(['/images']);
        }, 2000);
      },
      (error: any) => {
        console.error('Erreur lors de la modification de l\'image :', error);
        this.errorMessage = 'Erreur lors de la modification de l\'image.';
      }
    );
}

}
