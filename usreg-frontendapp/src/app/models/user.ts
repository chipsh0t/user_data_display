// export interface IUser {
//     id:number,
//     email:string,
//     first_name:string,
//     last_name:string,
//     social_insurance_number:string,
//     phone_number: string
// }


export interface IUser {
    id:number,
    email:string,
    firstName:string,
    lastName:string,
    roles:string[],
    status: string
}

// export class User implements IUser{
//     id: number;
//     email: string;
//     first_name: string;
//     last_name: string;
//     roles: string[];
//     status: string;

//     constructor(user_email:string, user_first_name:string, user_last_name:string, user_roles:string[], user_status:string){
//         this.email=user_email,
//         this.first_name=user_first_name, 
//         this.last_name=user_last_name, 
//         this.roles=user_roles, 
//         this.status = user_status
//     }
// }