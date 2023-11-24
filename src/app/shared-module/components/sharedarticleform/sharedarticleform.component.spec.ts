import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedarticleformComponent } from './sharedarticleform.component';

describe('SharedarticleformComponent', () => {
  let component: SharedarticleformComponent;
  let fixture: ComponentFixture<SharedarticleformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedarticleformComponent]
    });
    fixture = TestBed.createComponent(SharedarticleformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
