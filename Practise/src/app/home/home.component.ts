import { Component } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  slides = [
    { image: 'assets/images/carousel1.jpg', caption: 'Image 1' },
    { image: 'assets/images/carousel2.jpg', caption: 'Image 2' },
    { image: 'assets/images/carousel3.jpg', caption: 'Image 3' },
    { image: 'assets/images/carousel4.jpg', caption: 'Image 2' },
    { image: 'assets/images/carousel5.jpg', caption: 'Image 1' },
    { image: 'assets/images/carousel6.jpg', caption: 'Image 1' }
  ];

}
