import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavContactusComponent } from './sidenav-contactus.component';

describe('SidenavContactusComponent', () => {
  let component: SidenavContactusComponent;
  let fixture: ComponentFixture<SidenavContactusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavContactusComponent]
    });
    fixture = TestBed.createComponent(SidenavContactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
