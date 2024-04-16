import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPropertyListComponent } from './content-property-list.component';

describe('ContentPropertyListComponent', () => {
  let component: ContentPropertyListComponent;
  let fixture: ComponentFixture<ContentPropertyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentPropertyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentPropertyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
