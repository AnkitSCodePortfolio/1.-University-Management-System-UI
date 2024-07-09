import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Gender, Student } from '../models/student';
import { Teacher } from '../models/teacher';
import { Department, SubDepartment } from '../models/department';
import { College } from '../models/college';
import { TeacherUpdate } from '../models/teacherupdate';
import { StudentUpdate } from '../models/studentupdate';
import { Observable, catchError, throwError } from 'rxjs';
import { StudentReq } from '../models/studentReq';
import { TeacherReq } from '../models/teacherReq';
import { CollegeReq } from '../models/collegeReq';
import { DepartmentReq } from '../models/departmentReq';
import { City, Country, State } from '../models/Locations';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
baseurl:string ="https://localhost:7229/api/";
constructor(private http:HttpClient) { }

  GetAllStudents(): Observable<Student[]> {
    const url = this.baseurl + "Student";
    return this.http.get<Student[]>(url);
  }

  GetAllTeachers(): Observable<Teacher[]>{
    const url = this.baseurl + "Teacher";   
    return this.http.get<Teacher[]>(url);
  }
  GetAllCollege(): Observable<College[]>{
    const url = this.baseurl + "College";   
    return this.http.get<College[]>(url);
  }
  GetAllDepartment(): Observable<Department[]>{
    const url = this.baseurl + "Department";
    return this.http.get<Department[]>(url);
  }

  AddStudentData(student:StudentReq){
    console.log('Creation of Student Data Started');
    const url = this.baseurl +"Student"; 
    const formData = new FormData();   
    formData.append('name', student.name);
    formData.append('fatherName', student.fatherName);
    formData.append('motherName', student.motherName);
    formData.append('email', student.email);
    formData.append('phonenumber', student.phonenumber);
    formData.append('address', student.address);
    formData.append('dateofBirth', student.dateOfBirth.toString());
    formData.append('studentId', student.studentId.toString());
    formData.append('genderId', student.genderId.toString());
    formData.append('departmentId', student.departmentId.toString());
    formData.append('collegeId', student.collegeId.toString());
    formData.append('countryId', student.countryId.toString());
    formData.append('stateId', student.stateId.toString());
    formData.append('cityId', student.cityId.toString());
    if (student.profilepic && student.profilepic.name) {
      formData.append('profilepic', student.profilepic, student.profilepic.name);
    } else {
      console.error('Profile picture is missing or invalid.');
    }
    console.log(formData);
    console.log('Creation Finished');
    return this.http.post<Student>(url, formData);
  }
  AddTeacherData(Teacher:TeacherReq){
    console.log('Creation of Teacher Data Started');
    const url = this.baseurl +"Teacher";   //url
    const formData = new FormData();
    
    formData.append('name', Teacher.name);
    formData.append('email', Teacher.email);
    formData.append('address', Teacher.address);
    formData.append('phonenumber', Teacher.phonenumber);
    formData.append('dateOfBirth', Teacher.dateOfBirth.toString());
    formData.append('genderId', Teacher.genderId.toString());
    formData.append('cityId', Teacher.cityId.toString());
    formData.append('countryId', Teacher.countryId.toString());
    formData.append('stateId', Teacher.stateId.toString());
    formData.append('collegeId', Teacher.collegeId.toString());
    formData.append('departmentId', Teacher.departmentId.toString());
    if (Teacher.profilepic && Teacher.profilepic.name) {
      formData.append('profilepic', Teacher.profilepic, Teacher.profilepic.name);
    } else {
      console.error('Profile picture is missing or invalid.');
    }
    console.log(formData);
    console.log('Creation Finished');
    return this.http.post<Teacher>(url, formData);
  }
  AddCollegeData(College:CollegeReq){
    console.log('Creation of College Data Started');
    const url = this.baseurl +"College";   
    const formData = new FormData();
    formData.append('name', College.name);
    formData.append('email', College.email);
    formData.append('registrationId', College.registrationId);
    formData.append('address', College.address);
    formData.append('phonenumber', College.phonenumber);
    formData.append('cityId', College.cityId.toString());
    formData.append('countryId', College.countryId.toString());
    formData.append('stateId', College.stateId.toString());  
   
    if (College.collegeDoc && College.collegeDoc.name) {
      formData.append('profilepic', College.collegeDoc, College.collegeDoc.name);
    } else {
      console.error('Document is missing or invalid.');
    }
      console.log(formData);
      console.log('Creation Finished');
    return this.http.post<College>(url, formData);
  }
  AddDepartmentData(Department:DepartmentReq){
    const url = this.baseurl + "Department";
    return this.http.post<Department>(url,Department);    
  }


  DeleteStudentData(StudentId:number){
    const url = this.baseurl +"Student/" + StudentId;
    return this.http.delete(url);
  }
  DeleteTeacherData(TeacherId:number){
    const url = this.baseurl +"Teacher/" + TeacherId;
    return this.http.delete(url);
  } 
  DeleteCollegeData(CollegeId:number){
    const url = this.baseurl +"College/" + CollegeId;
    return this.http.delete(url);
  } 
  DeleteDepartmentData(DepartmentId:number){
    const url = this.baseurl +"Department/" + DepartmentId;
    return this.http.delete(url);
  }

  GetStudentById(StudentId:number) : Observable<Student>{
    const url = this.baseurl + "Student/" + StudentId;
    return this.http.get<Student>(url);
  }
  GetTeacherById(TeacherId:string){
    const url = this.baseurl + "Teacher/" + TeacherId;
    return this.http.get<Teacher>(url);
  }
  GetCollegeById(CollegeId:number){
    const url = this.baseurl + "College/" + CollegeId;
    return this.http.get<College>(url);
  }
  GetDepartmentById(DepartmentId:string){
    const url = this.baseurl + "Department/" + DepartmentId;
    return this.http.get<Department>(url);
  }


  EditStudentData(Updatedata:StudentUpdate, Id:number){
    const url = this.baseurl + "Student/" + Id;
    const formData = new FormData();
    formData.append('Name', Updatedata.name);
    formData.append('Email', Updatedata.email);
    formData.append('FatherName', Updatedata.fatherName);
    formData.append('MotherName', Updatedata.motherName);
    formData.append('Address', Updatedata.address);
    formData.append('PhoneNumber', Updatedata.phoneNumber);
    if (Updatedata.profilepic  && Updatedata.profilepic.name) {
      formData.append('Profilepic', Updatedata.profilepic, Updatedata.profilepic.name);
    }
    return this.http.put<Student>(url,formData);
  }
  EditTeacherData(Updatedata:TeacherUpdate, Id:number){
    const url = this.baseurl + "Teacher/" + Id;
    const formData = new FormData();

    formData.append('Name', Updatedata.Name);
    formData.append('Email', Updatedata.Email);
    formData.append('Address', Updatedata.Address);
    formData.append('PhoneNumber', Updatedata.PhoneNumber);
    if (Updatedata.Profilepic) {
      formData.append('Image', Updatedata.Profilepic, Updatedata.Profilepic.name);
    }
    return this.http.put<Teacher>(url,formData);
  }
 
  GetAllGenders(): Observable<Gender[]> {
    const url = this.baseurl + "Basic/Genders";
    return this.http.get<Gender[]>(url);
  }
  GetAllSubDepartment(): Observable<SubDepartment[]> {
    const url = this.baseurl + "Basic/SubDepartments";
    return this.http.get<SubDepartment[]>(url);
  }
  Country(): Observable<Country[]> {
    const url = this.baseurl + "Basic/Countries";
    return this.http.get<Country[]>(url);
  }
  State(): Observable<State[]> {
    const url = this.baseurl + "Basic/States";
    return this.http.get<State[]>(url);
  }
  GetAllCity(): Observable<City[]> {
    const url = this.baseurl + "Basic/Cities";
    return this.http.get<City[]>(url);
  }

}
