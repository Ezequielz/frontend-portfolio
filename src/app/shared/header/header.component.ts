import { Component, OnInit } from '@angular/core';
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faGithub,faFacebookF, faWhatsapp, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import { TokenService } from '../../services/token.service';

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

  isLogged = false;

  
  constructor( private tokenService: TokenService) { }

  ngOnInit(): void {
    if( this.tokenService.getToken() ){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

  onLogOut():void{
    this.tokenService.logout();
    window.location.reload();
  }

}
