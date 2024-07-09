    export interface Teacher 
    {
        id:number;
        name: string;
        email: string;
        phonenumber: string;
        address: string;
        dateOfBirth: any;
        gender: Gender;
        country: Country;
        state: State; 
        city: City;
        genderId: any;
        countryId: any;
        stateId: any;
        cityId: any;
        department: Department; 
        departmentId: any;
        profilepic: any;
        college: College;
        collegeId: any;
        message:string;
    }
    export interface Gender {
        Id: number;
        name: string;
      }
      
      export interface Country {
        Id: number;
        Name: string;
      }
      
      export interface State {
        Id: number;
        Name: string;
      }
      
      export interface City {
        Id: number;
        Name: string;
      }
      export interface Department {
        Id: number;
        Name: string;
      }
      export interface College {
        Id: number;
        Name: string;
      }