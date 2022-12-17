


export class Persona {
    id?: number;
    nombre: string;
    apellido: string;
    img: string;
    nacionalidad: string;
    domicilio: string;
    nacimiento: string;


    constructor(nombre: string, apellido: string, img: string, nacionalidad: string, domicilio: string, nacimiento : string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.img = img;
        this.nacionalidad = nacionalidad
        this.domicilio = domicilio
        this.nacimiento = nacimiento
    }
}