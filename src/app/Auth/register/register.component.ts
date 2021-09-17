import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,NgForm,Validators } from '@angular/forms';
import { AuthService } from '../AuthService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private AuthService:AuthService) { }

  ngOnInit(): void {
  }

  OnSignUp(form:NgForm){

    if(form.invalid){
      return;
    }
    this.AuthService.onRegister(form.value.name,form.value.jobTitle,form.value.ContactNumber,form.value.email,form.value.password);

  } 

}
