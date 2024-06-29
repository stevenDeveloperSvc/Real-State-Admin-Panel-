import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentUserInfoComponent } from './content-user-info.component';

describe('ContentUserInfoComponent', () => {
  let component: ContentUserInfoComponent;
  let fixture: ComponentFixture<ContentUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentUserInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
