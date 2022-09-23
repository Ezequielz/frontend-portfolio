import { Component, OnInit } from '@angular/core';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  faPenToSquare=faPenToSquare
  faTrashCan=faTrashCan

  constructor() { }

  ngOnInit(): void {
  }

}
