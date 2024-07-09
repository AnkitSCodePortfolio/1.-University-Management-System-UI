import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = false;

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    const theme = this.isDarkTheme ? 'dark-theme' : 'light-theme';
    document.body.classList.remove(this.isDarkTheme ? 'light-theme' : 'dark-theme');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }

  getThemeClass(): string {
    return this.isDarkTheme ? 'dark-theme' : 'light-theme';
  }
}