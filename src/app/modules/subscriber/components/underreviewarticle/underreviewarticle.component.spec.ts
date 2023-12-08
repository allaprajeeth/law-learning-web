import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderreviewarticleComponent } from './underreviewarticle.component';

describe('UnderreviewarticleComponent', () => {
  let component: UnderreviewarticleComponent;
  let fixture: ComponentFixture<UnderreviewarticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnderreviewarticleComponent]
    });
    fixture = TestBed.createComponent(UnderreviewarticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
