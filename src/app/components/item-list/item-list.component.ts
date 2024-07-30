import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddItemFormComponent } from '../add-item-form/add-item-form.component';

import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { loadItems } from '../../state/item.actions';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, AddItemFormComponent],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {
  private store = inject(Store); 
  itemList = toSignal(this.store.select(state => state.item.items));

  ngOnInit() {
    this.store.dispatch(loadItems());
  }
}
