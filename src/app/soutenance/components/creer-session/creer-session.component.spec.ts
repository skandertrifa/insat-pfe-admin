import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerSessionComponent } from './creer-session.component';

describe('CreerSessionComponent', () => {
  let component: CreerSessionComponent;
  let fixture: ComponentFixture<CreerSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
