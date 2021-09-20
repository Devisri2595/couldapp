import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Auth/AuthService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private AuthService:AuthService,private http: HttpClient) { }
  first_name :any;
  last_name:any;
  designation:any;
  division:any;
  email:any;
  contact_number:any;
  
  ngOnInit(): void {

      this.http.get<any>('http://localhost:3000/api/user/userdata/'+this.AuthService.getUserId())
      .subscribe(response=>{
        this.first_name=response.Data.first_name;
        this.last_name=response.Data.last_name,
        this.designation=response.Data.designation,
        this.division=response.Data.division,
        this.email=response.Data.email,
        this.contact_number=response.Data.contactnumber
        // console.log(response);
      });


      // this.http.delete('/api/posts/roots/'+postId)
      // .subscribe(()=>{
      //   const updatedPosts = this.childPosts.filter(posts => posts._id != postId);
      //   this.childPosts=updatedPosts;
      //   console.log("Deleted");
      // })

  }


}
