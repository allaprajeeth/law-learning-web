import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortAnstestpreviewComponent } from './short-anstestpreview.component';

describe('ShortAnstestpreviewComponent', () => {
  let component: ShortAnstestpreviewComponent;
  let fixture: ComponentFixture<ShortAnstestpreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShortAnstestpreviewComponent]
    });
    fixture = TestBed.createComponent(ShortAnstestpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
