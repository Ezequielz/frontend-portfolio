import { Component, OnInit } from '@angular/core';
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faGithub,faFacebookF, faWhatsapp, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import { TokenService } from '../../services/token.service';
import { ContactService } from 'src/app/services/contact.service';

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

  cv : string = ""
  
  constructor( private tokenService: TokenService,
      private contactService: ContactService
    ) { }

  ngOnInit(): void {
    this.contactService.detail(1).subscribe( data => {
      this.cv = data.cv
      
    })

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
