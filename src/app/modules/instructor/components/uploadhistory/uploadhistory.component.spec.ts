import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadhistoryComponent } from './uploadhistory.component';

describe('UploadhistoryComponent', () => {
  let component: UploadhistoryComponent;
  let fixture: ComponentFixture<UploadhistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadhistoryComponent]
    });
    fixture = TestBed.createComponent(UploadhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
