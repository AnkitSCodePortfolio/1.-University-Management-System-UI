import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DisplayComponent } from './display/display.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EditStudentsComponent } from './edit-students/edit-students.component';
import { EditTeachersComponent } from './edit-teachers/edit-teachers.component';
import { PromoComponent } from './promo/promo.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
  path:'Create',
  component:CreateComponent
  },
  {
  path:'Display',
  component:DisplayComponent
  },
  {
  path:'',
  component:PromoComponent,
  data:{ hideNavAndFooter: true }
  },

  {
  path:'Navbar',
  component:NavbarComponent
  },
  {
    path:'EditStudent/:id',
    component:EditStudentsComponent
    },
    {
    path:'EditTeacher/:id',
    component:EditTeachersComponent
    },
  {
    path: 'Home',
    component: HomeComponent,
    
  },
  {
    path:'auth',
    component:AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
