import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private expandedSource = new BehaviorSubject<string[]>([]);
  currentExpanded = this.expandedSource.asObservable();

  constructor() {}

  changeExpanded(expanded: string[]) {
    this.expandedSource.next(expanded);
  }
}
