export interface AuthDataLogin{
    email: String;
    password : String;
}

export interface AuthDataRegister{
    name:String,
    jobTitle:String,
    contactNumber:String,
    email: String;
    password : String;
}

export interface posts{

    id:string;
    name:string;
    message:string;
}