import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { About } from 'src/app/model/about';
import { AboutService } from 'src/app/services/about.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.css']
})
export class EditAboutComponent implements OnInit {

  about: About = null;
  form:FormGroup;

  constructor(private aboutService: AboutService ,
    private activatedRouter: ActivatedRoute,
    private router: Router ,
    private formBuilder: FormBuilder
    ) { }

ngOnInit(): void {

  const id = this.activatedRouter.snapshot.params['id'];

  this.aboutService.detail(id).subscribe( data => {
    this.about = data;
    this.form = this.formBuilder.group({
      info:[data.info,[Validators.required]],
      title:[data.title,[Validators.required]]
    })
  }, err =>{
    Swal.fire({
      title: 'error al modificar proyecto',
      icon:'error',
      showConfirmButton: false,
    })
    this.router.navigate(['']);
  });
  
}

get Info(){
  return this.form.get('info')
}
get Title(){
  return this.form.get('title')
}

onUpdate(event: Event){
  event.preventDefault()

  if(this.form.value.info && this.form.value.title){

    Swal.fire({
      title: 'Editando About',
      text: 'Espere...',
      showConfirmButton: false,
    })
  
    const id = this.activatedRouter.snapshot.params['id'];
       
    this.aboutService.update( id, this.form.value ).subscribe( data => {
  
      Swal.fire({
        icon: 'success',
        title: 'About Editado',
        timer: 1500,
        showConfirmButton: false
      })
      
      this.router.navigate(['']);
    },err =>{
      
      Swal.fire({
        icon: 'error',
        title: 'Error al modificar about',
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
}
