import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,NgForm,Validators } from '@angular/forms';
import { AuthService } from '../AuthService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  image:String="assets/Images/Register.JPG";

  constructor(private AuthService:AuthService) { }
  isLoading=false;
  hide = true;
  hide1 = true;
  ngOnInit(): void {
  }


  OnSignUp(form:NgForm){

    if(form.invalid){
      return;
    }
    this.AuthService.onRegister(form.value.First_name,form.value.Last_name,form.value.Division,form.value.Designation,form.value.ContactNumber,form.value.email,form.value.password);

  } 

}
