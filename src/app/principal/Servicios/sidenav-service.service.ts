import { Injectable } from '@angular/core';
import { BehaviorSubject,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavServiceService {

  constructor() { }

  private panelNameSource = new BehaviorSubject<string>('');
  panelName$ = this.panelNameSource.asObservable();

  private closeSidenavSubject = new Subject<void>();
  closeSidenav$ = this.closeSidenavSubject.asObservable();

  closeSidenav() {
    this.closeSidenavSubject.next();
  }

  setPanelName(name: string) {
    this.panelNameSource.next(name);
  }

  clearPanelName() {
    this.panelNameSource.next('');
  }
}
