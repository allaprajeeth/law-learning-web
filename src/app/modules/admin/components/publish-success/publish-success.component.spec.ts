import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishSuccessComponent } from './publish-success.component';

describe('PublishSuccessComponent', () => {
  let component: PublishSuccessComponent;
  let fixture: ComponentFixture<PublishSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublishSuccessComponent]
    });
    fixture = TestBed.createComponent(PublishSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
