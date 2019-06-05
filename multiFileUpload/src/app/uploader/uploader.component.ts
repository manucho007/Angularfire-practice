import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // toggles the hover
  isHovering: boolean;

  // array of files
  files: File[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  // Takes the filelist as an argument
  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

}
