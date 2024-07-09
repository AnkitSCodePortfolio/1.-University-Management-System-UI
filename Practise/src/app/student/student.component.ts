import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormControl,Validators,FormGroup } from '@angular/forms';
import { ApiServiceService } from '../services/api-service.service';
import { Gender, Student } from '../models/student';
import { Country,City,State } from '../models/Locations';
import { College } from '../models/college';
import { Department } from '../models/department';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [DatePipe],

})

export class StudentComponent implements OnInit {
  studentForm:FormGroup;
  constructor(private service:ApiServiceService,private datePipe: DatePipe)
  
  {
    this.studentForm = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Address:new FormControl('', [Validators.required]),
      Phone:new FormControl('', [Validators.required]),
      Date:new FormControl('', [Validators.required]),
      Student:new FormControl('', [Validators.required]),
      Mother:new FormControl('', [Validators.required]),
      Father:new FormControl('', [Validators.required]),
      Gender:new FormControl('',[Validators.required]),
      ProfilePicture: new FormControl(''),
      Country:new FormControl('',[Validators.required]),
      City:new FormControl('',[Validators.required]),
      State:new FormControl('',[Validators.required]),
      myControlC: new FormControl('', [Validators.required]),
      myControlD:new FormControl('', [Validators.required])
      
    });
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
  })

  }
  
  AddStudent() {
  
    if (!this.myControlC.value) {
      this.myControlC.markAsTouched();
      return;
    }
  
    if (!this.myControlD.value) {
      this.myControlD.markAsTouched();
      return;
    }
  
    if (this.studentForm.get('Date')?.invalid) {
      this.studentForm.get('Date')?.markAsTouched();
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
    const dateOfBirth: Date = this.studentForm.get('Date')?.value;
    const formattedDateOfBirth: string = formatDate(dateOfBirth, 'yyyy-dd-MMTHH:mm:ss', 'en-US');
    // const uniqueFilename = `${uuidv4()}_${this.selectedProfilePicture?.name}`;
    const studentReq = {
      name: this.studentForm.get('Name')?.value,
      fatherName: this.studentForm.get('Father')?.value,
      motherName: this.studentForm.get('Mother')?.value,
      email: this.studentForm.get('Email')?.value,
      phonenumber: this.studentForm.get('Phone')?.value,
      address: this.studentForm.get('Address')?.value,
      studentId: this.studentForm.get('Student')?.value,
      dateOfBirth: formattedDateOfBirth,
      genderId: this.studentForm.get('Gender')?.value,
      countryId: this.studentForm.get('Country')?.value,
      stateId: this.studentForm.get('State')?.value,
      cityId: this.studentForm.get('City')?.value,
      departmentId: selectedDepartment.id,
      collegeId: selectedCollege.id,
      profilepic: this.selectedProfilePicture,
    };
    this.service.AddStudentData(studentReq).subscribe(
      (response: Student) => {
        this.showSuccessAlert(response.message);
        this.studentForm.reset();
        this.profilePictureUrl = 'assets/images/pic.png'; 
        console.log("success")
      },
      error => {
        this.showErrorAlert()
        console.log("error")
      }
    );
  
    console.log('Data to be sent to the API:', studentReq);  

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
  getErrorMessage(controlName: string) {
    let control = this.studentForm.get(controlName);

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
      }
      if(controlName === 'Student')
      {
        return 'Student Id is required'
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
  hide = true;
  profilePictureUrl: string = 'assets/images/pic.png';

  // uploadProfilePicture(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.profilePictureUrl = e.target.result;
  //       const profilePictureControl = this.studentForm.get('ProfilePicture');
  //       if (profilePictureControl) {
  //         profilePictureControl.patchValue(null); 
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  
  uploadProfilePicture(event: any): void {
    const file = event.target.files[0];
    console.log('Selected File:', file);
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
