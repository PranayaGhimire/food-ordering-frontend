export enum UserRole {
    USER="USER",
    ADMIN="ADMIN",
}
export interface IRegisterForm {
    name:string;
    username:string;
    email:string;
    password:string;
    role:UserRole
}