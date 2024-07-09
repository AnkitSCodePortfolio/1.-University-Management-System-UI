import {Component, OnInit} from '@angular/core';
import { FormControl,Validators,FormGroup } from '@angular/forms';
import { Student } from '../models/student';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-edit-students',
  templateUrl: './edit-students.component.html',
  styleUrls: ['./edit-students.component.css']
})
export class EditStudentsComponent {
  studentedit:FormGroup;
  

  constructor(private apiservice:ApiServiceService,private route:ActivatedRoute,private router:Router){
    this.studentedit = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Address:new FormControl('', [Validators.required]),
      Phone:new FormControl('', [Validators.required]),
      Mother:new FormControl('', [Validators.required]),
      Father:new FormControl('', [Validators.required]),
      ProfilePicture: new FormControl(''),
    });
  }
ngOnInit():void{
  this.route.params.subscribe(params =>{
    const studentId = params['id'];
    this.apiservice.GetStudentById(studentId).subscribe(student =>{
      this.studentedit.patchValue({
        Name:student.name,
        Mother:student.motherName,
        Father:student.fatherName,
        Email:student.email,
        Phone:student.phonenumber,
        Address:student.address,
        ProfilePicture:student.profilepic
        
      });
    });
  });
}
EditStudent()
  {
    this.route.params.subscribe(params=>{
      const studentId = params['id'];
      if(this.studentedit.valid){
        this.apiservice.EditStudentData (this.studentedit.value, studentId).subscribe((response:Student)=>{
          this.showSuccessAlert(response.message);
        });        
       this.showErrorAlert();
      }
    });
  }

  getErrorMessage(controlName: string) {
    let control = this.studentedit.get(controlName);

    if (control?.hasError('required')) {
      
      if (controlName === 'Name') {
        return 'Name is required';
      }
      if(controlName === 'Father') {
        return 'Father is required'
      }
      if(controlName === 'Email')
      {
        return 'Email is required'
      }
      if(controlName === 'Mother')
      {
        return 'Mother is required'
      } if(controlName === 'Phone')
      {
        return 'Phone Number is required'
      }
      if(controlName === 'Address')
      {
        return 'Address is required'
      }
    }

    return '';
  }

  showSuccessAlert(message:string) {
    Swal.fire({
      title: 'Success!',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  showErrorAlert() {
    Swal.fire({
      title: 'Error!',
      text: 'Something went wrong or Student Already Exists with the same entries!',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  value ='';
  profilePictureUrl: string = 'assets/images/pic.png';
  uploadProfilePicture(event: any): void {
    const file = event.target.files[0];
    console.log('Selected File:', file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePictureUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
