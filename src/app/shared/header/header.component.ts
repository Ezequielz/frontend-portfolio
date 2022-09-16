import { Component, OnInit } from '@angular/core';
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faGithub,faFacebookF, faWhatsapp, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faCloudArrowDown=faCloudArrowDown
  faEnvelope=faEnvelope
  faFacebookF=faFacebookF
  faGithub=faGithub
  faWhatsapp=faWhatsapp
  faLinkedin=faLinkedinIn
  
  constructor() { }

  ngOnInit(): void {
  }

}
