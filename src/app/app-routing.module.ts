import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Auth/auth.guard';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {path:'login',component : LoginComponent},
  {path:'Register',component:RegisterComponent},
  {path:'members',component: SpecialEventsComponent,canActivate:[AuthGuard]},
  {path:'events',component:EventsComponent,canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'home',component:HomeComponent},
  {path:'',redirectTo:'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
