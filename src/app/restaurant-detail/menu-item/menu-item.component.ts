import { MenuItem } from './../../core/model/menu-item.model';
import { OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Component } from '@angular/core';


@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html'
})
export class MenuItemComponent implements OnInit {

  @Input() menuItem: MenuItem;
  @Output() add = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  emitAddEvent() {
    this.add.emit(this.menuItem);
  }

}
