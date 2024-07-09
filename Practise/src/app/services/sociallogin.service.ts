import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocialloginService {
  url = 'https://localhost:7229/api/Login/SavesResponse';
  constructor(private http: HttpClient) { }

  Savesresponse(response:any)
  {
    return this.http.post(this.url,response);
  }
}
