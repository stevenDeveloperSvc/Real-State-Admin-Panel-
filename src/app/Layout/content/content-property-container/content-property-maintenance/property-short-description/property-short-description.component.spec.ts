import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyShortDescriptionComponent } from './property-short-description.component';

describe('PropertyShortDescriptionComponent', () => {
  let component: PropertyShortDescriptionComponent;
  let fixture: ComponentFixture<PropertyShortDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyShortDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertyShortDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
