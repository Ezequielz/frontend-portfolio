


export class Contact {
    id:string;
    city: string;
    cv: string;
    email: string;
    github: string;
    linkedin: string;
    tel: string;

    constructor( city: string, cv: string, email: string, github: string, linkedin: string, tel: string ){
        this.city = city
        this.cv = cv
        this.email = email
        this.github = github
        this.linkedin = linkedin
        this.tel = tel

    }
}
