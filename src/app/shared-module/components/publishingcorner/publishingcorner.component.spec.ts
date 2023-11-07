import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishingcornerComponent } from './publishingcorner.component';

describe('PublishingcornerComponent', () => {
  let component: PublishingcornerComponent;
  let fixture: ComponentFixture<PublishingcornerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublishingcornerComponent]
    });
    fixture = TestBed.createComponent(PublishingcornerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
