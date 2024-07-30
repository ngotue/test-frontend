import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addItem } from '../../state/item.actions';

@Component({
  selector: 'app-add-item-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-item-form.component.html',
  styleUrl: './add-item-form.component.css'
})
export class AddItemFormComponent {
  errorMessage = ''
  form: FormGroup

  private store = inject(Store)

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      item: new FormControl('', Validators.required)
    })
  }

  onFocus() {
    this.errorMessage = ''
  }

  onSubmit() {
    this.form.markAllAsTouched()
    
    if(this.form.invalid) {
      this.errorMessage = 'Field is required'
      return
    }

    this.store.dispatch(addItem({ item: this.form.value }));
    this.form.reset()
  }
}
