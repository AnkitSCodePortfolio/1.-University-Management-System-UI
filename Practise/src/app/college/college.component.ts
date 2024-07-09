import { Component,OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormControl,Validators,FormGroup } from '@angular/forms';
import {MatBottomSheet,MatBottomSheetModule,MatBottomSheetRef,}from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import { CollegeBottomNavComponent } from '../college-bottom-nav/college-bottom-nav.component';
import { Country,City,State } from '../models/Locations';
import { College } from '../models/college';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css']
})
export class CollegeComponent implements OnInit {
  collegeForm:FormGroup;
  constructor(private _bottomSheet: MatBottomSheet,private service:ApiServiceService) 
  {
    this.collegeForm = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Address:new FormControl('', [Validators.required]),
      Phone:new FormControl('', [Validators.required]),
      Registration:new FormControl('', [Validators.required]),
      Country:new FormControl('',[Validators.required]),
      City:new FormControl('',[Validators.required]),
      State:new FormControl('',[Validators.required]),

     
    })
  }
  Countries:Country[]=[];
  States: State[] = [];
  Cities: City[] = [];

  countryId: number | undefined;
  stateId: number |undefined;
  selectedProfilePicture: File | null = null;

  openBottomSheet(): void {
    this._bottomSheet.open(CollegeBottomNavComponent);
  
  }
  myControlC = new FormControl('');

  ngOnInit() {

  this.service.Country().subscribe(country=>{
    this.Countries=country;
   
  })
  this.service.State().subscribe(state=>{
    this.States=state;
    
  })
  this.service.GetAllCity().subscribe(city=>{
    this.Cities=city;
  
  })

  }
  AddCollege()
  {
    // const uniqueFilename = `${uuidv4()}_${this.selectedProfilePicture?.name}`;
    const collegereq ={
      name: this.collegeForm.get('Name')?.value,
      registrationId: this.collegeForm.get('Registration')?.value,
      email: this.collegeForm.get('Email')?.value,
      phonenumber: this.collegeForm.get('Phone')?.value,
      address: this.collegeForm.get('Address')?.value,
      countryId: this.collegeForm.get('Country')?.value,
      stateId: this.collegeForm.get('State')?.value,
      cityId: this.collegeForm.get('City')?.value,
      collegeDoc:this.selectedProfilePicture,
    };
    this.service.AddCollegeData(collegereq).subscribe(
      (response: College) => {
        this.showSuccessAlert(response.message)
        this.collegeForm.reset();
        console.log("success")
      },
      error => {
        this.showErrorAlert()
        console.log("error")
      }
    );
  
    console.log('Data to be sent to the API:', collegereq);
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
      text: 'Something went wrong or College Already Exists with the same entries!',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
  getErrorMessage(controlName: string) {
    let control = this.collegeForm.get(controlName);

    if (control?.hasError('required')) {
      
      if (controlName === 'Name') {
        return 'Name is required';
      }
      if(controlName === 'Email')
      {
        return 'Email is required'
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
      if(controlName === 'Registration')
      {
        return 'Registration is required'
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
  value = '';
  hide = true;
  profilePictureUrl: string = 'assets/images/pic.png';
  uploadProfilePicture(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePictureUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
}
