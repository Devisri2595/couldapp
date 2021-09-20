export interface AuthDataLogin{
    email: String;
    password : String;
}

export interface AuthDataRegister{
    First_name:String,
    Last_name:String,
    Division:String,
    Designation:String,
    contactNumber:String,
    email: String;
    password : String;
}

export interface posts{

    id:string;
    name:string;
    message:string;
}