import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { DisplayComponent } from './display/display.component';
import {ReactiveFormsModule} from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms'
import { MaterialModule } from './material/material.module';
import { FooterComponent } from './footer/footer.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { DepartmentComponent } from './department/department.component';
import { CollegeComponent } from './college/college.component';
import { DisplayStudentsComponent } from './display-students/display-students.component';
import { EditStudentsComponent } from './edit-students/edit-students.component';
import { EditTeachersComponent } from './edit-teachers/edit-teachers.component';
import { DisplayTeachersComponent } from './display-teachers/display-teachers.component';
import { DisplayDepartmentsComponent } from './display-departments/display-departments.component';
import { DisplayCollegesComponent } from './display-colleges/display-colleges.component';
import { CollegeBottomNavComponent } from './college-bottom-nav/college-bottom-nav.component';
import { PromoComponent } from './promo/promo.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CreateComponent,
    DisplayComponent,
    FooterComponent,
    StudentComponent,
    TeacherComponent,
    DepartmentComponent,
    CollegeComponent,
    DisplayStudentsComponent,
    EditStudentsComponent,
    EditTeachersComponent,
    DisplayTeachersComponent,
    DisplayDepartmentsComponent,
    DisplayCollegesComponent,
    CollegeBottomNavComponent,
    PromoComponent,
    LoginComponent,
    SignupComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    SocialLoginModule,

  ],
  providers: [ {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('678224779869-3sisgc5hgo341bs1rc5kolhglec0lt9m.apps.googleusercontent.com')         
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('312307744525270')
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {

 }

