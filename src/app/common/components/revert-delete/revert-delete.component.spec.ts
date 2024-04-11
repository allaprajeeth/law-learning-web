import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevertDeleteComponent } from './revert-delete.component';

describe('RevertDeleteComponent', () => {
  let component: RevertDeleteComponent;
  let fixture: ComponentFixture<RevertDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevertDeleteComponent]
    });
    fixture = TestBed.createComponent(RevertDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
