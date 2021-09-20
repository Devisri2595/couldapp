import {HttpRequest,HttpHandler,HttpInterceptor} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './AuthService';
// import { LoginComponent } from './login/login.component';
import { localStore} from './localStore'


@Injectable()
export class authInterceptor implements HttpInterceptor{

      constructor(private AuthService: AuthService,private localStore: localStore) { }
      intercept(req: HttpRequest<any>, next: HttpHandler) {

        const authToken = this.localStore.getToken();
        const authRequest = req.clone({
          headers: req.headers.set("Authorization","Bearer " + authToken)
        });
        return next.handle(authRequest);
      }
}