import { Injectable } from '@angular/core';
import { HttpClient ,
  HttpHeaders,} from '@angular/common/http';
  import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  baseURL = 'http://localhost:9992/image';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public fb: FormBuilder,
    private http: HttpClient) { }


    form: FormGroup = this.fb.group({
      _id: [''],
      nom:[''],
      image: [null]
        })
    
        
  //form reset
formReset(){
  this.form.reset();
  this.form =  this.fb.group({
    _id: [''],
     nom:[''],
      })
}


  //add user
  addImage(image: any ,profileImage: File):Observable<any>{
    let formData = new FormData();
    formData.append('nom' , image.nom);
    formData.append('image' , image.image);

    return this.http.post(`${this.baseURL}/create` , formData)
  }

  //getImage
  getImage(){
    return this.http.get(this.baseURL+'/get');
  }


  getImageById(id: string) {
    return this.http.get(this.baseURL + `/${id}`);
  }


//remove image
deleteImage(id: string){
  return this.http.delete(this.baseURL + `/${id}`)
}

//update user Profile
// updateImage(image: any ,profileImage: File):Observable<any>{
//   let formData = new FormData();
//   formData.append('nom' , image.nom);
//   formData.append('image' , image.image);

//   return this.http.put(this.baseURL + `/update/${image._id}` , formData)
// }
// Mettre à jour une image
// updateImage(id: string, data: any) {
//   return this.http.put(this.baseURL + `/image/${id}`, data);
// }

updateImage(id: string, image: any, profileImage: File): Observable<any> {
  let formData = new FormData();
  formData.append('nom', image.nom);
  if (profileImage) {
    formData.append('image', profileImage);
  }

  return this.http.put(`${this.baseURL}/update/${id}`, formData);
}


}
