import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierSoutenanceComponent } from './modifier-soutenance.component';

describe('ModifierSoutenanceComponent', () => {
  let component: ModifierSoutenanceComponent;
  let fixture: ComponentFixture<ModifierSoutenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierSoutenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierSoutenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
