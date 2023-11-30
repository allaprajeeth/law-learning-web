import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentManagerLibraryComponent } from './content-manager-library.component';

describe('ContentManagerLibraryComponent', () => {
  let component: ContentManagerLibraryComponent;
  let fixture: ComponentFixture<ContentManagerLibraryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentManagerLibraryComponent]
    });
    fixture = TestBed.createComponent(ContentManagerLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
