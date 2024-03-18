import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedarticleHistoryComponent } from './sharedarticle-history.component';

describe('SharedarticleHistoryComponent', () => {
  let component: SharedarticleHistoryComponent;
  let fixture: ComponentFixture<SharedarticleHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedarticleHistoryComponent]
    });
    fixture = TestBed.createComponent(SharedarticleHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
