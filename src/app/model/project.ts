


export class Project {
    id?: number;
    title: string;
    descripcion: string;
    img: string;
    giturl?: string;
    weburl?: string;

    constructor(title: string, desripcion: string , img: string , giturl: string, weburl: string){
        this.title = title
        this.descripcion = desripcion
        this.img = img
        this.giturl = giturl
        this.weburl = weburl
    }
}
