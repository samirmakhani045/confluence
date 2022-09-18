import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  private sidenav$ = new BehaviorSubject<boolean>(true);
  selectedSidenav$ = this.sidenav$.asObservable();

  constructor() { }

  setSidenav(product: any) {
    this.sidenav$.next(product);
  }
}
