import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareddeleteAccountComponent } from './shareddelete-account.component';

describe('ShareddeleteAccountComponent', () => {
  let component: ShareddeleteAccountComponent;
  let fixture: ComponentFixture<ShareddeleteAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShareddeleteAccountComponent]
    });
    fixture = TestBed.createComponent(ShareddeleteAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
