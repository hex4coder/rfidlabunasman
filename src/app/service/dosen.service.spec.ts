/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DosenService } from './dosen.service';

describe('Service: Dosen', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DosenService]
    });
  });

  it('should ...', inject([DosenService], (service: DosenService) => {
    expect(service).toBeTruthy();
  }));
});
