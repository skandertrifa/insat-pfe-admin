import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeacherExcelComponent } from './add-teacher-excel.component';

describe('AddTeacherExcelComponent', () => {
  let component: AddTeacherExcelComponent;
  let fixture: ComponentFixture<AddTeacherExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeacherExcelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeacherExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
