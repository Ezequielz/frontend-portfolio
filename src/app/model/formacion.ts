

export class Formacion {
    id?: number;
    fecha: string;
    title: string;
    subtitle: string;
    info: string;


    constructor( fecha:string, title: string, subtitle: string, info: string){
        this.title = title
        this.subtitle = subtitle
        this.info = info
        this.fecha = fecha

    }

}