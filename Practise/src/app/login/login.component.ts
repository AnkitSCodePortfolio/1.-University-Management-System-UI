import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router:Router) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }
  ngOnInit(): void {
  }
  onSubmit() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    if (username === 'yourUsername' && password === 'yourPassword') {
      console.log('Login successful');
      this.router.navigate(['/Home']);
    } else {
      console.log('Login failed');
    }

    this.loginForm.reset();
  }

}

