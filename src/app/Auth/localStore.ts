import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class localStore  {


    private _token : string="";

    
   setToken(token:any){
       this._token = token;
   }

   getToken(){
       return this._token;
   }

}