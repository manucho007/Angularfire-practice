import { Directive, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[dropzone]'
})

// Receive the files and emit them as a custom event
export class DropzoneDirective {
  // Custom event to listen to events that happen in this child's directive
  // dropped is a custom event that gets the filelist
  @Output() dropped = new EventEmitter<FileList>();

  // Custom event to check if the user is hovering over the element
  @Output() hovered = new EventEmitter<boolean>();

  // Intercept the drop event in the DOM
  @HostListener('drop', ['$event'])

  // When the user drops the files
  ondrop($event) {
    // Prevents that a default new window is opened
    $event.preventDefault();
    // Directive emits the files as a custom event
    this.dropped.emit($event.dataTransfer.files);
    // Sets the hovered as false
    this.hovered.emit(false);
  }

  // When the user drags over the drop target
  @HostListener('dragover', ['$event'])
  onDragOver($event) {
    $event.preventDefault();
    this.hovered.emit(true);
  }

  // When the user stops draging over the drop target
  @HostListener('dragleave', ['$event'])
  onDragLeave($event) {
    $event.preventDefault();
    this.hovered.emit(false);
  }
}
