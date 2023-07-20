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
    first_name:string,
    last_name:string,
    roles:string[],
    status: string
}