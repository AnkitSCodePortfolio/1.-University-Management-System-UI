import { Component } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { SocialloginService } from '../services/sociallogin.service';
import { Socialusers } from '../models/socialusers';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(
    private authService: SocialAuthService,
    private socialLoginService: SocialloginService, 
    private router: Router
  ) {}

  async socialSignIn(provider: string): Promise<void> {
    try {
      let socialUser: SocialUser | null = null;

      if (provider === 'facebook') {
        socialUser = await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
      } else if (provider === 'google') {
        socialUser = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
      }

      if (socialUser) {
        this.handleSocialLogin(socialUser);
      }
    } catch (error) {
      console.log('Error signing in:', error);
    }
  }
  

  handleSocialLogin(socialUser: SocialUser): void {
    const socialusers = new Socialusers();
    socialusers.name = socialUser.name;
    socialusers.email = socialUser.email;

    this.socialLoginService.Savesresponse(socialusers).subscribe(
      (res: any) => {
        localStorage.setItem('socialusers', JSON.stringify(socialusers));
        this.router.navigate(['/Home']);
      },
      (error) => {
        console.error('Error saving social user data:', error);
      }
    );
  }
}
