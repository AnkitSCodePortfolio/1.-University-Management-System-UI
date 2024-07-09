import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { College } from '../models/college';
import { ApiServiceService } from '../services/api-service.service';


@Component({
  selector: 'app-display-colleges',
  templateUrl: './display-colleges.component.html',
  styleUrls: ['./display-colleges.component.css']
})
export class DisplayCollegesComponent {
  Colleges:College[]=[]
  displayedColumns: string[] = ['Name', 'RegistrationID', 'Email', 'Phonenumber','Address','Country','State','City','actions'];
  
  constructor(private apiService: ApiServiceService) { }

  ngOnInit(): void {
    this.apiService.GetAllCollege().subscribe(College => {
      this.Colleges = College;
      console.log(College);
    });
}
}
