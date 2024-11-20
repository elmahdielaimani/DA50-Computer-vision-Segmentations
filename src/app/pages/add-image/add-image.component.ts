import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from 'app/image.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent implements OnInit {

  errorMessage: string = '';
  successMessage: string = "";
  imagePreview: any;
  image: any = {};
  constructor(public imageService: ImageService,
    public router : Router) { }

  ngOnInit(): void {
  }

 
 
onSelectImage(event: any){
  const file = (event.target as HTMLInputElement).files[0]
  console.log(file.type)
  this.imageService.form.patchValue({
    image: file,
  });

  const allowedFileType = ['image/png' ,'image/jpg'  ,'image/jpeg'];
if(file && allowedFileType.includes(file.type)){
const reader = new FileReader()
reader.onload = () => {
this.imagePreview = reader.result as string
}
reader.readAsDataURL(file)
}
}

onSubmit() {
  if (this.imageService.form.value._id === '') {
    this.imageService
      .addImage(this.imageService.form.value, this.imageService.form.value.image)
      .subscribe(
        (res: any) => {
          // Afficher un message de succès
          this.successMessage ='Image ajoutée avec succès !';
          
            setTimeout(() => {
              this.router.navigate(['/images']);
            }, 2000);
          
          this.imagePreview = null;
          // Réinitialiser le formulaire après succès
          this.imageService.form.reset();
        },
        (error: any) => {
          // Afficher un message d'erreur
        this.errorMessage = "Une erreur s\'est produite lors de l\'ajout de l\'image. Veuillez réessayer.";
        
        
        setTimeout(() => {
          this.errorMessage = "";
        }, 10000); // Masquer le message après 3 secondes
         
        }
      );
  }
}



  


}
