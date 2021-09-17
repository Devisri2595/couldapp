import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {
  itemCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    constructor(private http:HttpClient) { }

  ngOnInit(): void {
               this.http.get<any>('http://localhost:3000/api/user/data')
        .subscribe((responsedata)=>{
          this.employees=responsedata.Data;
            console.log(responsedata.Data);
        });
  }
  employees=[{name:"",jobtitle:"",email:"",contactnumber:""}];

}
