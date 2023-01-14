import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from 'src/app/model/contact';
import { ContactService } from 'src/app/services/contact.service';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  contact: Contact = null;
  savePDF: boolean = false;
  form:FormGroup;

  constructor(private contactService: ContactService,
     private router: Router,
     public imgService: ImageService,
     private formBuilder: FormBuilder 
      ) { }


  ngOnInit(): void {

    this.imgService.cleanUrl();

    this.contactService.detail(1).subscribe( data => {
      this.contact = data;
      this.form = this.formBuilder.group({
        city:[data.city,[Validators.required]],
        cv:[data.cv,[Validators.required]],
        email:[data.email,[Validators.required, Validators.email]],
        github:[data.github,[Validators.required]],
        linkedin:[data.linkedin,[Validators.required]],
        tel:[data.tel,[Validators.required]]

      })
  
    }, err =>{
      Swal.fire({
        title: 'error al modificar contacto',
        icon:'error',
        showConfirmButton: false,
      })
      this.router.navigate(['']);
    });

  }

  get City(){
    return this.form.get('city')
  }
  get Cv(){
    return this.form.get('cv')
  }
  get Email(){
    return this.form.get('email')
  }
  get Github(){
    return this.form.get('github')
  }
  get Linkedin(){
    return this.form.get('linkedin')
  }
  get Tel(){
    return this.form.get('tel')
  }

  onUpdate(event: Event){
    event.preventDefault()

    if(this.form.value.city && this.form.value.cv && this.form.value.email && this.form.value.github && this.form.value.linkedin && this.form.value.tel){

      Swal.fire({
        title: 'Editando Contacto',
        text: 'Espere...',
        showConfirmButton: false,
      })
  
      if(this.imgService.url){
  
        this.form.value.cv = this.imgService.url
      }
  
      this.contactService.update( 1,  this.form.value ).subscribe( data => {
        Swal.fire({
          icon: 'success',
          title: 'Contacto Editado',
          timer: 1500,
          showConfirmButton: false
        })
        this.router.navigate(['']);
      },err =>{
        Swal.fire({
          icon: 'error',
          title: 'Error al modificar contacto',
          timer: 1500,
          showConfirmButton: false
        })
        this.router.navigate(['']);
      });
    }else{
      Swal.fire({
        title: 'Debe completar todos los campos',
        icon:'error',
        timer:1500,
        showConfirmButton: false,
      })
    }
    
  }

  uploadImage($event: any){
    this.savePDF = true
    const name = "contact_" + 1
    this.imgService.uploadImage( $event, name ).then(r =>{

      this.savePDF = false
    });

  }

}
