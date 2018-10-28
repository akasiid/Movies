import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[Click]'
})
export class ClickDirective {

  @Output() direction = new EventEmitter();
  @Output() favorites = new EventEmitter();

  constructor() { }

  @HostListener('click', ['$event']) onClick(event) {
    try {
      // emit left direction emit
      if (event.target.className.indexOf('_left') > -1) {
        this.direction.emit('left');
      }

      // emit right direction emit
      if (event.target.className.indexOf('_right') > -1) {
        this.direction.emit('right');
      }

      // stop link event from favorite section
      if (event.target.className.indexOf('favorites') > -1) {
        event.stopPropagation();
        event.preventDefault();
      }

      // add/remove to favorite
      if (event.target.className.indexOf('favorites-add') > -1) {
        event.stopPropagation();
        this.favorites.emit('favorite_action');
      }
    } catch (err) {}
  }
}
