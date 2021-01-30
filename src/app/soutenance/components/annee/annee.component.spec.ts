import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerAnneeComponent } from './creer-annee.component';

describe('CreerAnneeComponent', () => {
  let component: CreerAnneeComponent;
  let fixture: ComponentFixture<CreerAnneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerAnneeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerAnneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
