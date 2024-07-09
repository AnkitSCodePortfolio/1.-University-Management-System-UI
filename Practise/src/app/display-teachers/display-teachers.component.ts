import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ApiServiceService } from '../services/api-service.service';
import { Teacher } from '../models/teacher';
import { TeacherReq } from '../models/teacherReq';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-teachers',
  templateUrl: './display-teachers.component.html',
  styleUrls: ['./display-teachers.component.css']
})
export class DisplayTeachersComponent {
  Teachers:Teacher[]=[];
  teacherEdit:TeacherReq=new TeacherReq();
  displayedColumns: string[] = ['Id','Name','Email','DateofBirth','Gender', 'Phonenumber','Address','College','Department','Country','State','City','actions'];
  
  constructor(private apiService: ApiServiceService, private router:Router) { }

  ngOnInit(): void {
    this.apiService.GetAllTeachers().subscribe(Teacher => {
      this.Teachers = Teacher;
      console.log(Teacher);
    });
}

DeleteTeacher(TeacherId:number){
  this.apiService.DeleteTeacherData(TeacherId).subscribe(()=>{
    this.ngOnInit();
  })
}

EditTeacher(TeacherId:number)
{
  this.router.navigate(['/EditTeacher', TeacherId]); 
}
}
