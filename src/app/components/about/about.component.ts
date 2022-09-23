import { Component, OnInit } from '@angular/core';
import { faShop, faIdCard, faPager, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { faGithub,faFacebookF, faWhatsapp, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  faShop=faShop
  faPager=faPager
  faIdCard=faIdCard
  faPenToSquare=faPenToSquare
  faTrashCan=faTrashCan

  constructor() { }

  ngOnInit(): void {
  }

}
