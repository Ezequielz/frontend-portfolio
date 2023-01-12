import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { About } from 'src/app/model/about';
import { AboutService } from 'src/app/services/about.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.css']
})
export class EditAboutComponent implements OnInit {

  about: About = null;

  constructor(private aboutService: AboutService ,
    private activatedRouter: ActivatedRoute,
    private router: Router  
    ) { }

ngOnInit(): void {

  const id = this.activatedRouter.snapshot.params['id'];

  this.aboutService.detail(id).subscribe( data => {
    this.about = data;
  }, err =>{
    alert("Error al modificar el proyecto");
    this.router.navigate(['']);
  });
  
}

onUpdate(){

  Swal.fire({
    title: 'Editando About',
    text: 'Espere...',
    showConfirmButton: false,
  })

  const id = this.activatedRouter.snapshot.params['id'];
     
  this.aboutService.update( id, this.about ).subscribe( data => {

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
}
}
