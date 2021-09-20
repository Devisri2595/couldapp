import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthDataLogin, AuthDataRegister } from './auth-data.model';
import { localStore } from './localStore';
@Injectable({ providedIn: "root" })
export class AuthService {


  constructor(private http: HttpClient, private Router: Router,private localstore:localStore) {

  }
  private tokens: String = "";
  private isAuthenticated = false;
  private tokenTimer : any;
  private userId: any;
  private authStatusListner = new Subject<boolean>();
  UserData :any=[];


  onLogin(email: string, password: string) {
    const AuthDataLogin: AuthDataLogin = {
      email: email,
      password: password
    };
    //  this.http.get<any>('http://localhost:3000/api/user/Login')
    // .subscribe((responsedata)=>{
    //     console.log(responsedata);
    // });
    this.http.post<{ token: String,expiresIn:number,userid:String }>('http://localhost:3000/api/user/Login', AuthDataLogin)
      .subscribe(response => {
        // console.log("Responsessss"+response);
        // console.log(response.expiresIn)
        const expiresInDuration:number = response.expiresIn;
        const token = response.token;
        this.userId=response.userid;
        this.tokens = token;
        // console.log(this.tokens);
        this.localstore.setToken(this.tokens);
        if (token) {
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListner.next(true);
          this.userId=response.userid;
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          // console.log(expirationDate);
          this.saveAuthData(token, expirationDate,this.userId);
          this.Router.navigate(["/"]);
          // console.log(response);
        }
      }, error => {
        alert(error.error.message);
        this.authStatusListner.next(false);
      });
  }

  getUserId(){
    return this.userId;
  }
  private saveAuthData(token: any, expirationDate: Date,userId:string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId",userId);
  }
  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.tokens = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListner.next(true);
    }
  }

  private setAuthTimer(expiresInTime:number){
    this.tokenTimer = setTimeout(()=>{
      this.logout();
     }, expiresInTime * 1000);
  }

  logout() {
    this.tokens = "";
    this.userId=null;
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.Router.navigate(["/"]);
  }
  getauthStatusListner() {
    return this.authStatusListner.asObservable();
  }
  getIsAuthenticated() {
    return this.isAuthenticated;
  }
  onRegister(First_name: string, Last_name: string, Division: string, Designation: string, ContactNumber: string, email: string, password: string) {
    const AuthDataRegister: AuthDataRegister = {
      email: email,
      password: password,
      First_name: First_name,
      Last_name: Last_name,
      Division: Division,
      Designation: Designation,
      contactNumber: ContactNumber,
    };
    // console.log("pass:" + AuthDataRegister.password);

    this.http.post<{ message: String }>('http://localhost:3000/api/user/Register', AuthDataRegister)
      .subscribe(response => {
        this.Router.navigate(["/login"]);
        // console.log(response);
      });
  }

}