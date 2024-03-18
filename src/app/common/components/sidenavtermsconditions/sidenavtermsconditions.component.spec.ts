import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavtermsconditionsComponent } from './sidenavtermsconditions.component';

describe('SidenavtermsconditionsComponent', () => {
  let component: SidenavtermsconditionsComponent;
  let fixture: ComponentFixture<SidenavtermsconditionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavtermsconditionsComponent]
    });
    fixture = TestBed.createComponent(SidenavtermsconditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
