import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Error404NotFoundComponent } from './error404-not-found.component';

describe('Error404NotFoundComponent', () => {
  let component: Error404NotFoundComponent;
  let fixture: ComponentFixture<Error404NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Error404NotFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Error404NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
