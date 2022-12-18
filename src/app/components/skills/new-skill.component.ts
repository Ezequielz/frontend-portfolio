import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Skill } from 'src/app/model/skill';
import { ImageService } from 'src/app/services/image.service';
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

  constructor( private skillService: SkillService,
     private router: Router,
     public imgService: ImageService
     ) { }

  ngOnInit(): void {
  }

  onCreate(){
    const skill = new Skill( this.nombre, this.porcentaje, this.img );

    skill.img = this.imgService.url
    this.skillService.save( skill ).subscribe( data => {
      console.log(skill)
      alert("Skill creada correctamente");
      this.imgService.cleanUrl();
      this.router.navigate(['']);
    }, err =>{
      alert("error al añadir skill");
      this.router.navigate(['']);
    });
  }

  uploadImage($event : any){
    const name = "skill_" 
    this.imgService.uploadImage( $event, name  );
  }

}
