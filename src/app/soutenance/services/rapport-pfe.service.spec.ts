import { TestBed } from '@angular/core/testing';

import { RapportPfeService } from './rapport-pfe.service';

describe('RapportPfeService', () => {
  let service: RapportPfeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RapportPfeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
