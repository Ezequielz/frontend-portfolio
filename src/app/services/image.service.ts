import { Injectable } from '@angular/core';
import { getDownloadURL, list, ref, Storage, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url: string = ""
  
  constructor( private storage: Storage ) { }

  public async uploadImage($event: any, name: string){
    const file = $event.target.files[0]

    const imgRef = ref( this.storage, `imagen/`+ name + "_" + file.name )

   await uploadBytes( imgRef, file )
      .then( async response =>{

      await  getDownloadURL(imgRef).then(
          url => {
            this.url = url;
          }
        )

      })
      .catch( err => console.log(err))
  }

  public cleanUrl(){
    this.url = ""
  }
  // getImages(){
  //   const imgRef = ref( this.storage, 'imagen' )
  //   list(imgRef)
  //     .then( async response => {
  //       for (const item of response.items) {
          
  //         this.url = await getDownloadURL(item);
  //         console.log("La url es: " + this.url)
  //       }
  //     })
  //     .catch(err => console.log(err))
  // }


}
