import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-college-bottom-nav',
  templateUrl: './college-bottom-nav.component.html',
  styleUrls: ['./college-bottom-nav.component.css']
})
export class CollegeBottomNavComponent {
@ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
selectedFileName: string | undefined;
selectedProfilePicture: File | null = null;


constructor(private _bottomSheetRef: MatBottomSheetRef<CollegeBottomNavComponent>) {}

openLink(event: MouseEvent, link: string): void {
  if (link === 'from-system') {
    this.fileInput.nativeElement.click();
  }
  this._bottomSheetRef.dismiss();
  event.preventDefault();
}
// onFileSelected(event: any): void {
//     const files: FileList = event.target.files;
//     if (files.length > 0) {
//       const selectedFile = files[0];
//       this.selectedFileName = selectedFile.name;

//   }
// }
uploadProfilePicture(event: any): void {
  const files: FileList = event.target.files;
  if (files.length > 0) {
    const selectedFile = files[0];
    this.selectedProfilePicture = selectedFile;
    this.selectedFileName = selectedFile.name; // Update selectedFileName
  }
}

}