import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/model/skill';
import { SkillService } from '../../services/skill.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {

  skill: Skill = null;
  saveImage: boolean = false;

  constructor( private skillService: SkillService,
     private activatedRoute: ActivatedRoute,
     private router: Router,
     public imgService: ImageService
     ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.imgService.cleanUrl();
    this.skillService.detail( id ).subscribe( data => {
      this.skill = data;
    }, err =>{
      alert('Error al modificar el skill');
      this.router.navigate(['']);
    });
  }

  onUpdate(){

    Swal.fire({
      title: 'Editando Skill',
      text: 'Espere...',
      showConfirmButton: false,
    })


    const id = this.activatedRoute.snapshot.params['id'];


    if (this.imgService.url){

      this.skill.img = this.imgService.url
    }



    this.skillService.update(id, this.skill).subscribe( data => {

      Swal.fire({
        icon: 'success',
        title: 'Skill Editado',
        timer: 1500,
        showConfirmButton: false
      })
      this.router.navigate(['']);

    }, err =>{
      Swal.fire({
        icon: 'error',
        title: 'Error al modificar skill',
        timer: 1500,
        showConfirmButton: false
      })
      this.router.navigate(['']);
    });
  }

  uploadImage($event : any){
    this.saveImage = true
    const id = this.activatedRoute.snapshot.params['id'];
   
    const name = "project_" + id
    this.imgService.uploadImage( $event, name ).then(r =>{

      this.saveImage = false
    });
  }
}
