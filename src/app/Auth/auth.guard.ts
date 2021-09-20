import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from './AuthService';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private AuthService:AuthService,private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const isAuth = this.AuthService.getIsAuthenticated();
        if(!isAuth){
            this.router.navigate(["/login"]);
        }
        return true;
    }

}