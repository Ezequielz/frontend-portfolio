import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/model/skill';
import { SkillService } from '../../services/skill.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {

  skill: Skill = null;

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
    const id = this.activatedRoute.snapshot.params['id'];

    this.skill.img = this.imgService.url
    this.skillService.update(id, this.skill).subscribe( data => {
      this.router.navigate(['']);

    }, err =>{
      alert('error al modificar la skill')
      this.router.navigate(['']);
    });
  }

  uploadImage($event : any){
    const id = this.activatedRoute.snapshot.params['id'];
   
    const name = "project_" + id
    this.imgService.uploadImage( $event, name );
  }
}
