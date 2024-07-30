import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap } from 'rxjs';

const rootUrl = 'http://localhost:3000'

@Injectable()
export class ItemService {

  private apiUrl = rootUrl + '/api/items'

  private itemsSubject = new BehaviorSubject<string[]>([]);
  itemList$ = this.itemsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialItems(); 
  }

  loadInitialItems() {
    this.http.get<string[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Error loading items:', error);
          return of([]);
        })
      )
      .subscribe(items => this.itemsSubject.next(items));
  }

  getItems(): Observable<string[]> {
    return this.itemList$;
  }

  addItem(item: {item : string}): Observable<string[]> {
    return this.http.post<string>(this.apiUrl, item).pipe(
      switchMap(newItem => {
        return this.http.get<string[]>(this.apiUrl);
      }),
      tap(updatedItems => {
        this.itemsSubject.next(updatedItems);
      })
    );
  }
}
