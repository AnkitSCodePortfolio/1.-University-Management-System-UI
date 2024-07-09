import { Component,OnInit,Input, HostBinding } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private themeService: ThemeService,private auth:AuthService) {}
  @HostBinding('class') public currentThemeClass = this.themeService.getThemeClass();

  toggleTheme(event: any): void {
    this.themeService.toggleTheme();
    this.currentThemeClass = this.themeService.getThemeClass();
  }
  logout()
  {
      this.auth.logout();
  }
}
