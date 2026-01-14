export enum UserRole {
    USER="USER",
    ADMIN="ADMIN",
}
export interface IRegisterForm {
    fullName:string;
    username:string;
    phoneNumber:string;
    email:string;
    password:string;
    role:UserRole,
    profileImageUrl?:string;
}