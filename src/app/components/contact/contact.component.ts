import { Component, OnInit } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faGithub,faFacebookF, faWhatsapp, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  faEnvelope=faEnvelope
  faFacebookF=faFacebookF
  faGithub=faGithub
  faWhatsapp=faWhatsapp
  faLinkedin=faLinkedinIn

  constructor() { }

  ngOnInit(): void {
  }

}
