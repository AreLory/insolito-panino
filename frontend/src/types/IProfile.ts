export default interface IProfile {
    firstName: string;
    lastName:string;
    email:string;
    phoneNumber?:string;
    address:{
        street?:string;
        number?:string;
    }
}