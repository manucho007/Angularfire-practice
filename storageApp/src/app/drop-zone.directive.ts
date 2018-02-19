import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[dropZone]'
})
export class DropZoneDirective {

// create custom event
@Output() dropped = new EventEmitter<FileList>();
@Output() hovered = new EventEmitter<boolean>();

  constructor() { }
// listens to the drop event
@HostListener('drop',['$event'])
onDrop($event){
  // Prevents the browser from opening another tab
  $event.preventDefault();
  this.dropped.emit($event.dataTransfer.files);
  this.hovered.emit(false);
}

@HostListener('dragover',['$event'])
onDragover($event){
  $event.preventDefault();
  this.hovered.emit(true);
}

@HostListener('dragleave', ['$event'])
  onDragLeave($event) {
    $event.preventDefault();
    this.hovered.emit(false);
  }

}
