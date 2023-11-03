import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewFreecourseComponent } from './overview-freecourse.component';

describe('OverviewFreecourseComponent', () => {
  let component: OverviewFreecourseComponent;
  let fixture: ComponentFixture<OverviewFreecourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewFreecourseComponent]
    });
    fixture = TestBed.createComponent(OverviewFreecourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
