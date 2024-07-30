import { createReducer, on } from '@ngrx/store';
import * as ItemActions from './item.actions';

export interface ItemState {
  items: string[];
  loading: boolean;
  error: any;
}

export const initialState: ItemState = {
  items: [],
  loading: false,
  error: null
};

export const itemReducer = createReducer(
  initialState,
  on(ItemActions.loadItems, state => ({ ...state, loading: true })),
  on(ItemActions.loadItemsSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false
  })),
  on(ItemActions.loadItemsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(ItemActions.addItemSuccess, (state, { items }) => ({
    ...state,
    items
  }))
);
