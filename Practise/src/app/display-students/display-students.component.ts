import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ApiServiceService } from '../services/api-service.service';
import { Gender, Student } from '../models/student';
import { StudentReq } from '../models/studentReq';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-students',
  templateUrl: './display-students.component.html',
  styleUrls: ['./display-students.component.css']
})
export class DisplayStudentsComponent {
  Students: Student[] = [];
  genders: Gender[] = [];
  studentEdit:StudentReq = new StudentReq();
  displayedColumns: string[] = ['Id','name','fathername','mothername','email','dateofBirth','gender', 'phonenumber','address','college','department','country','state','city','actions'];
  
  constructor(private apiService: ApiServiceService, private router:Router) { }

  ngOnInit(): void {
    this.apiService.GetAllStudents().subscribe(Student => {
      this.Students = Student;
      console.log(Student);
      
    });
  }
 
  
  
  

  DeleteStudent(studentId:number){
    this.apiService.DeleteStudentData(studentId).subscribe(()=>{
      this.ngOnInit();
    })
  }

  EditStudentData(studentId:number)
  {
    this.router.navigate(['/EditStudent', studentId]); 
  }
  
}
