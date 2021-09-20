import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthDataLogin,AuthDataRegister } from './auth-data.model';

@Injectable({ providedIn: "root" })
export class AuthService{

    constructor(private http:HttpClient){
        
    }
    onLogin(email:string,password:string){
        const AuthDataLogin: AuthDataLogin ={
            email: email,
            password:password
          };
        //  this.http.get<any>('http://localhost:3000/api/user/Login')
        // .subscribe((responsedata)=>{
        //     console.log(responsedata);
        // });
        this.http.post<{token:String}>('https://cloudbackend1.azurewebsites.net/api/user/Login',AuthDataLogin)
        .subscribe(response=>{
            console.log(response);  
        });
    }
    onRegister(name:string,jobTitle:string,ContactNumber:string,email:string,password:string){
        const AuthDataRegister: AuthDataRegister ={
            email: email,
            password:password,
            name:name,
            jobTitle:jobTitle,
            contactNumber:ContactNumber,
          };
      
          this.http.post<{message:String}>('https://cloudbackend1.azurewebsites.net/api/user/Register',AuthDataRegister)
          .subscribe(response=>{
            console.log(response);
          });
        }
}
