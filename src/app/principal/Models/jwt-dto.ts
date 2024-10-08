import { Avatar } from "./Avatar";

export class JwtDTO {
    token!: string;
    type!: string;
    nombreUsuario!: string;
    nombre!:string;
    establecimiento!: string;
    authorities!: string[];
    avatar!: Avatar;
}
