import { Injectable } from '@angular/core';
import { PropertyResponseInfo } from '@interface/Content';
import { BehaviorSubject, Observable, filter, shareReplay } from 'rxjs';
import { PropertyService } from './property.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyStateService {
  private propertyInfoSubject = new BehaviorSubject<PropertyResponseInfo | null>(null);

  constructor(private propertyService: PropertyService) {}

  setPropertyInfo(propertyInfo: PropertyResponseInfo) {
    this.propertyInfoSubject.next(propertyInfo);
  }

  getPropertyInfo(): Observable<PropertyResponseInfo | null> {
    return this.propertyInfoSubject.asObservable().pipe( filter(propertyInfo => propertyInfo !== null));
  }

  fetchPropertyInfo(propertyId: number): Promise<PropertyResponseInfo> {
    return new Promise((resolve, reject) => {
      const cachedPropertyInfo = this.propertyInfoSubject.getValue();
      if (cachedPropertyInfo && cachedPropertyInfo.responseDTO.propertyId === propertyId) {
        resolve(cachedPropertyInfo);
        return;
      }

      this.propertyService.GetPropertyById(propertyId).subscribe({
        next: (data) => {
          this.setPropertyInfo(data);
          resolve(data);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }
}