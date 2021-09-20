import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import {AuthService} from './Auth/AuthService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngApp';

  userAuthenticated =false;
  private authListnerSubs= new Subscription;

  constructor(private AuthService:AuthService) { }

  ngOnInit() {
     window.scroll(0,0);
    this.authListnerSubs = this.AuthService.getauthStatusListner()
    .subscribe((isAuthenticated: boolean)=>{
      this.userAuthenticated=isAuthenticated;
    });
  }
  image:String="assets/Images/logo1.jpg";

  ngOnDestroy(){
    this.authListnerSubs.unsubscribe();
  }
  logOut(){
    this.AuthService.logout();
  }

}
