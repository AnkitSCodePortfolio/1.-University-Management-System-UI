import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormControl,Validators,FormGroup } from '@angular/forms';
import { ApiServiceService } from '../services/api-service.service';
import Swal from 'sweetalert2';
import { Department, SubDepartment } from '../models/department';
import { DepartmentReq } from '../models/departmentReq';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departmentForm:FormGroup;
  constructor(private service:ApiServiceService)
  {
    this.departmentForm = new FormGroup({
      Name:new FormControl('', [Validators.required]),
      Category:new FormControl('', [Validators.required]),
    })
  }
  SubDepartment:SubDepartment[]=[];

  ngOnInit() {

    this.service.GetAllSubDepartment().subscribe(sub=>{
      this.SubDepartment=sub;     
    })
  }
  AddDepartmeant(){
    
  const deparReq ={
    name:this.departmentForm.get('Name')?.value,
    subDepartmentId:this.departmentForm.get('Category')?.value,
  };
   
    this.service.AddDepartmentData(deparReq).subscribe (
      (response: Department) => {
        this.showSuccessAlert(response.message)
        this.departmentForm.reset();
        console.log("success")
      },
      error => {
        this.showErrorAlert();
        console.log("error")
      }
    );
  
    console.log('Data to be sent to the API:', deparReq);  

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
      text: 'Something went wrong or Department Already Exists with the same entries!',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
  getErrorMessage(controlName: string) {
    let control = this.departmentForm.get(controlName);

    if (control?.hasError('required')) {
      
      if (controlName === 'Name') {
        return 'Name is required';
      }
      if (controlName === 'Category') {
        return 'Category is required';
      }
    }
    return '';
  }

  value = '';
  
}
