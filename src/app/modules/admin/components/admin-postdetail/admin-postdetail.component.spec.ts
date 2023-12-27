import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostdetailComponent } from './admin-postdetail.component';

describe('AdminPostdetailComponent', () => {
  let component: AdminPostdetailComponent;
  let fixture: ComponentFixture<AdminPostdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPostdetailComponent]
    });
    fixture = TestBed.createComponent(AdminPostdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
