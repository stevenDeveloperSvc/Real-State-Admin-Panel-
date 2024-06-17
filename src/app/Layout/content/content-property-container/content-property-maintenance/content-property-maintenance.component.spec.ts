import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPropertyMaintenanceComponent } from './content-property-maintenance.component';

describe('ContentPropertyMaintenanceComponent', () => {
  let component: ContentPropertyMaintenanceComponent;
  let fixture: ComponentFixture<ContentPropertyMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentPropertyMaintenanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentPropertyMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
