import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteaccountComponent } from './deleteaccount.component';

describe('DeleteaccountComponent', () => {
  let component: DeleteaccountComponent;
  let fixture: ComponentFixture<DeleteaccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteaccountComponent]
    });
    fixture = TestBed.createComponent(DeleteaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
