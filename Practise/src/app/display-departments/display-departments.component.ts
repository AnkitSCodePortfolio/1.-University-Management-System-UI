import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Department } from '../models/department';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-display-departments',
  templateUrl: './display-departments.component.html',
  styleUrls: ['./display-departments.component.css']
})
export class DisplayDepartmentsComponent {
  Department:Department[]=[]
  displayedColumns: string[] = ['Name','Branch','actions'];
  constructor(private apiService: ApiServiceService) { }
  ngOnInit(): void {
    this.apiService.GetAllDepartment().subscribe(Department => {
      this.Department = Department;
      console.log(Department);
    });
  }
}
