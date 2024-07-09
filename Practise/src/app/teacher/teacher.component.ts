import { Component, OnInit } from '@angular/core';
import { FormControl,Validators,FormGroup } from '@angular/forms';
import { ApiServiceService } from '../services/api-service.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Country,City,State } from '../models/Locations';
import { College } from '../models/college';
import { Department } from '../models/department';
import Swal from 'sweetalert2';
import { Gender,Teacher } from '../models/teacher';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
  providers: [DatePipe],
})
export class TeacherComponent implements OnInit{
  TeacherForm:FormGroup;
  constructor(private service:ApiServiceService)
  {
    this.TeacherForm = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Address:new FormControl('', [Validators.required]),
      Phone:new FormControl('', [Validators.required]),
      Date:new FormControl('', [Validators.required]),
      Gender:new FormControl('',[Validators.required]),
      ProfilePicture: new FormControl(null),
      Country:new FormControl('',[Validators.required]),
      City:new FormControl('',[Validators.required]),
      State:new FormControl('',[Validators.required]),
      myControlC: new FormControl('', [Validators.required]),
      myControlD: new FormControl('', [Validators.required]),
    });
    // this.myControlC = new FormControl('', [Validators.required]);
    // this.myControlD = new FormControl('', [Validators.required]);
  }
  Genders:Gender[]=[];
  Countries:Country[]=[];
  States: State[] = [];
  Cities: City[] = [];
  College:College[]=[];
  Department:Department[]=[];

  countryId: number | undefined;
  stateId: number |undefined;
  selectedProfilePicture: File | null = null;

  myControlC = new FormControl('');
  myControlD = new FormControl('');
  filteredOptionsC!: Observable<College[]>;
  filteredOptionsD!: Observable<Department[]>;

  
  ngOnInit() {
    this.filteredOptionsC = this.myControlC.valueChanges.pipe(
      startWith(''),
      map(value => this._filterC(value || '')),
  );
  this.filteredOptionsD = this.myControlD.valueChanges.pipe(
    startWith(''),
    map(value => this._filterD(value || '')),
);
  
  this.service.GetAllGenders().subscribe(gender=>{
    this.Genders=gender;
   
  })
  this.service.Country().subscribe(country=>{
    this.Countries=country;
   
  })
  this.service.State().subscribe(state=>{
    this.States=state;
    
  })
  this.service.GetAllCity().subscribe(city=>{
    this.Cities=city;
  
  })
  this.service.GetAllCollege().subscribe(college=>{
    this.College=college;

  })
  this.service.GetAllDepartment().subscribe(dept=>{
    this.Department=dept;
    console.log(dept);
  })

  }
 
  AddTeacher() {
    if (!this.myControlC.value) {
      this.myControlC.markAsTouched();
      return;
    }
  
    if (!this.myControlD.value) {
      this.myControlD.markAsTouched();
      return;
    }
  
    if (this.TeacherForm.get('Date')?.invalid) {
      this.TeacherForm.get('Date')?.markAsTouched();
      return;
    }
    
    const selectedDepartment = this.Department.find(d => d.name === this.myControlD.value);
    const selectedCollege = this.College.find(c => c.name === this.myControlC.value);
    
    
    if (!selectedDepartment) {
      this.myControlD.markAsTouched();
      return;
    }
    
    if (!selectedCollege) {
      this.myControlC.markAsTouched();
      return;
    }
    const dateOfBirth: Date = this.TeacherForm.get('Date')?.value;
    const formattedDateOfBirth: string = formatDate(dateOfBirth, 'yyyy-dd-MMTHH:mm:ss', 'en-US');
    const uniqueFilename = `${uuidv4()}_${this.selectedProfilePicture?.name}`;
    
    const teacherReq ={
      name:this.TeacherForm.get('Name')?.value,
      email: this.TeacherForm.get('Email')?.value,
      phonenumber: this.TeacherForm.get('Phone')?.value,
      address: this.TeacherForm.get('Address')?.value,
      dateOfBirth: formattedDateOfBirth,
      genderId: this.TeacherForm.get('Gender')?.value,
      countryId: this.TeacherForm.get('Country')?.value,
      stateId: this.TeacherForm.get('State')?.value,
      cityId: this.TeacherForm.get('City')?.value,
      departmentId: selectedDepartment.id,
      collegeId: selectedCollege.id,
      profilepic: uniqueFilename,
    };
    this.service.AddTeacherData(teacherReq).subscribe(
      (response:Teacher) => {
        this.showSuccessAlert(response.message)
        this.TeacherForm.reset();
        console.log("success")
      },
      error => {
        this.showErrorAlert()
        console.log("error")
      }
    );
    console.log('Data to be sent to the API:', teacherReq);  
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
      text: 'Something went wrong or Teacher Already Exists with the same entries!',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
  getErrorMessage(controlName: string) {
    let control = this.TeacherForm.get(controlName);

    if (control?.hasError('required')) {
      
      if (controlName === 'Name') {
        return 'Name is required';
      }
      if(controlName === 'Email')
      {
        return 'Email is required'
      }
      if(controlName === 'Date')
      {
        return 'Date of Birth is required'
      }
      if(controlName === 'Phone')
      {
        return 'Phone Number is required'
      }
      if(controlName === 'Address')
      {
        return 'Address is required'
      }
      if(controlName === 'Country')
      {
        return 'Country is required'
      }
      if(controlName === 'Gender')
      {
        return 'Gender is required'
      }
      if(controlName === 'State')
      {
        return 'State is required'
      }
      if(controlName === 'City')
      {
        return 'City is required'
      }
      
    }
    return '';
  }

private _filterC(value: string): College[] {
  const filterValue1 = value.toLowerCase();

  return this.College.filter(college => college.name.toLowerCase().includes(filterValue1));
}

private _filterD(value: string): Department[] {
  const filterValue2 = value.toLowerCase();

  return this.Department.filter(department => department.name.toLowerCase().includes(filterValue2));
}

  value = '';
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  profilePictureUrl: string = 'assets/images/pic2.png';

  uploadProfilePicture(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePictureUrl = e.target.result;
        this.selectedProfilePicture = file;
      };
      reader.readAsDataURL(file);
    }
  }
  
}
