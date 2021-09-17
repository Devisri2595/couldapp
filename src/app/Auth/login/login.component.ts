import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../AuthService';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 constructor(private AuthService:AuthService) { }
 isLoading = false;
  ngOnInit(): void {
  }
  Login(form:NgForm){
    console.log(form.value.email);
    
    if(form.invalid){
      alert("Invalid");
    }
    this.isLoading=true;
    this.AuthService.onLogin(form.value.email,form.value.password);
    this.isLoading=false;
    
  }

}
