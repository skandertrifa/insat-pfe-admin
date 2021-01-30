import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerSalleComponent } from './creer-salle.component';

describe('CreerSalleComponent', () => {
  let component: CreerSalleComponent;
  let fixture: ComponentFixture<CreerSalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerSalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
