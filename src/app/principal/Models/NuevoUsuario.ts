export class NuevoUsuario {
    nombre: string;
    nombreUsuario: string;
    email: string;
    password: string;
    establecimiento: string;
    roles:string[];
    constructor(nombre: string, nombreUsuario: string, email: string,establecimiento: string, password: string, roles: string[]) {
        this.nombre = nombre;
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.establecimiento = establecimiento;
        this.password = password;
        this.roles= roles;
    }
}
