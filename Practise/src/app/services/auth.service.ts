import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as auth0 from 'auth0-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private webAuth: auth0.WebAuth;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router) {
    this.webAuth = new auth0.WebAuth({
            domain: 'dev-kjo3p8ms71n20h6x.us.auth0.com',
            clientID: 'NC7DEFoGRpOyk0klQ0Z22IZOXwIJ6zwZ',
            redirectUri: window.location.origin + '/Home',
            responseType: 'token id_token',
          });
    const isAuthenticated = this.isAuthenticated();
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  public login(): void {
         this.webAuth.authorize();
       }

  public handleAuthentication(): void {
    this.webAuth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        this.isAuthenticatedSubject.next(true); 
        this.router.navigate(['/Home']);
      } else if (err) {
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['/']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  public async logout() {
    localStorage.clear();
    this.isAuthenticatedSubject.next(false);
    this.webAuth.logout({ returnTo: '' });
  }

  // ...

  public isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('access_token');
    const idToken = localStorage.getItem('id_token');
    return !!(accessToken && idToken);
  }

  public getUserDisplayName(): string  {
    const idToken = localStorage.getItem('id_token');
    
    if (idToken) {
      const decodedToken = this.parseJwt(idToken);
      return decodedToken && decodedToken.name ? decodedToken.name : null;
    }
    
    return "";
  }

  private parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
}
