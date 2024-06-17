import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPropertyContainerComponent } from './content-property-container.component';

describe('ContentPropertyContainerComponent', () => {
  let component: ContentPropertyContainerComponent;
  let fixture: ComponentFixture<ContentPropertyContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentPropertyContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentPropertyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
