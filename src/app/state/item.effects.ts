import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import * as ItemActions from './item.actions';
import { ItemService } from '../services/item.service';

@Injectable()
export class ItemEffects {
  private itemService = inject(ItemService);

  loadItems$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(ItemActions.loadItems),
      switchMap(() =>
        this.itemService.getItems().pipe(
          map((items) => ItemActions.loadItemsSuccess({ items })),
          catchError((error) => of(ItemActions.loadItemsFailure({ error })))
        )
      )
    )
  );

  addItem$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(ItemActions.addItem),
      mergeMap((action) =>
        this.itemService.addItem(action.item).pipe(
          map((items) => ItemActions.addItemSuccess({ items })),
          catchError((error) => of(ItemActions.addItemFailure({ error })))
        )
      )
    )
  );
}
