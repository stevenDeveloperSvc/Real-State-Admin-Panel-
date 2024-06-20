import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyBasicInfoComponent } from './property-basic-info.component';

describe('PropertyBasicInfoComponent', () => {
  let component: PropertyBasicInfoComponent;
  let fixture: ComponentFixture<PropertyBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyBasicInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertyBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
