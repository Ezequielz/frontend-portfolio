import { Component, OnInit } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faGithub,faFacebookF, faWhatsapp, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import { faPenToSquare, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TokenService } from '../../services/token.service';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from '../../model/contact';

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
  faPlus=faPlus
  faPenToSquare=faPenToSquare


  contact: Contact = null;
  urlMap:string = "" 
  isAdmin = false

  constructor( private tokenService: TokenService, private contactService: ContactService,) { }
  
  isLogged = false
  ngOnInit(): void {
    this.loadContact();
    console.log(this.contact)
    if(this.tokenService.getToken()){
      this.isLogged = true

      if ( JSON.parse(sessionStorage.getItem('AuthAuthorities'))[1] ){

        this.isAdmin = true
       }

    }else{
      this.isLogged = false
    }
  }

  loadContact(){
    this.contactService.detail(1).subscribe( data => {
      this.contact = data
      this.urlMap = `https://maps.google.com/maps?q=${ data.city }&t=&z=11&ie=UTF8&iwloc=&output=embed`
    })
  }



}
