import { createAction, props } from '@ngrx/store';

export const loadItems = createAction('[Item] Load Items');
export const loadItemsSuccess = createAction(
  '[Item] Load Items Success',
  props<{ items: string[] }>()
);
export const loadItemsFailure = createAction(
  '[Item] Load Items Failure',
  props<{ error: any }>()
);

export const addItem = createAction(
  '[Item] Add Item',
  props<{ item: {item: string} }>()
);
export const addItemSuccess = createAction(
  '[Item] Add Item Success',
  props<{ items: string[] }>()
);
export const addItemFailure = createAction(
  '[Item] Add Item Failure',
  props<{ error: any }>()
);
