import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierSujetComponent } from './modifier-sujet.component';

describe('ModifierSujetComponent', () => {
  let component: ModifierSujetComponent;
  let fixture: ComponentFixture<ModifierSujetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierSujetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierSujetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
