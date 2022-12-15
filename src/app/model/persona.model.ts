


export class persona {
    id?: number;
    nombre: String;
    apellido: String;
    img: String;
    nacionalidad: String;
    email: String;
    domicilio: String;
    nacimiento: String;


    constructor(nombre: String, apellido: String, img: String, nacionalidad: String,email: String, domicilio: String, nacimiento : String){
        this.nombre = nombre;
        this.apellido = apellido;
        this.img = img;
        this.nacionalidad = nacionalidad
        this.email = email
        this.domicilio = domicilio
        this.nacimiento = nacimiento
    }
}