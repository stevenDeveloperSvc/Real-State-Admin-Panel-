import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private imageUpdatedSource = new Subject<void>();
  imageUpdated$ = this.imageUpdatedSource.asObservable();

  emitImageUpdated() {
    this.imageUpdatedSource.next();
  }
}
