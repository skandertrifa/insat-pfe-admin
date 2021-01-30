import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerJuryComponent } from './creer-jury.component';

describe('CreerJuryComponent', () => {
  let component: CreerJuryComponent;
  let fixture: ComponentFixture<CreerJuryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerJuryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerJuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
