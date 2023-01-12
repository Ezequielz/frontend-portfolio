import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Skill } from 'src/app/model/skill';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';
import { SkillService } from '../../services/skill.service';

@Component({
  selector: 'app-new-skill',
  templateUrl: './new-skill.component.html',
  styleUrls: ['./new-skill.component.css']
})
export class NewSkillComponent implements OnInit {
  nombre: string;
  porcentaje: number;
  img: string;
  saveImage: boolean = false;

  constructor( private skillService: SkillService,
     private router: Router,
     public imgService: ImageService
     ) { }

  ngOnInit(): void {
  }

  onCreate(){
    const skill = new Skill( this.nombre, this.porcentaje, this.img );


    Swal.fire({
      title: 'Creando Skill',
      text: 'Espere...',
      showConfirmButton: false,
    })


    skill.img = this.imgService.url

    this.skillService.save( skill ).subscribe( data => {
   
      Swal.fire({
        title: 'Skill creada correctamente',
        text: "Quieres agregar otra?",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Agregar'
      }).then((result) => {
        this.imgService.cleanUrl();
        if (!result.isConfirmed) {
          this.router.navigate(['']);
        }
      })

    

    }, err =>{
      Swal.fire({
   
        icon: 'error',
        title: 'error al agregar skill',
        showConfirmButton: false,
        timer: 2500
      })
      this.router.navigate(['']);
    });
  }

  uploadImage($event : any){
    this.saveImage = true
    const name = "skill_" 
    this.imgService.uploadImage( $event, name  ).then(r =>{

      this.saveImage = false
    });
  }

}
