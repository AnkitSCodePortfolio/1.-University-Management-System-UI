export interface College
{
    id: number;
    name: string;
    registrationId:string;
    email: string;
    phonenumber: string;
    address: string;
    collegeDoc: any;
    country: Country;
    state: State; 
    city: City;
    countryId: number;
    stateId: number;
    cityId: number;
    message:string;
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
