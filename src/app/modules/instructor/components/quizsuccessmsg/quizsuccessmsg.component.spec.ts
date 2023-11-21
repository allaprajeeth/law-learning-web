import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizsuccessmsgComponent } from './quizsuccessmsg.component';

describe('QuizsuccessmsgComponent', () => {
  let component: QuizsuccessmsgComponent;
  let fixture: ComponentFixture<QuizsuccessmsgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizsuccessmsgComponent]
    });
    fixture = TestBed.createComponent(QuizsuccessmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
