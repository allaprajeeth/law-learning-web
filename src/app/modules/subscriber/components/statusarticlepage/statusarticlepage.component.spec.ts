import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusarticlepageComponent } from './statusarticlepage.component';

describe('StatusarticlepageComponent', () => {
  let component: StatusarticlepageComponent;
  let fixture: ComponentFixture<StatusarticlepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusarticlepageComponent]
    });
    fixture = TestBed.createComponent(StatusarticlepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
