import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerSoutenanceComponent } from './creer-soutenance.component';

describe('CreerSoutenanceComponent', () => {
  let component: CreerSoutenanceComponent;
  let fixture: ComponentFixture<CreerSoutenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerSoutenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerSoutenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
