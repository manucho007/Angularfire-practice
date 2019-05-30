import { TestBed, async, inject } from '@angular/core/testing';

import { CanReadGuard } from './can-read.guard';

describe('CanReadGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanReadGuard]
    });
  });

  it('should ...', inject([CanReadGuard], (guard: CanReadGuard) => {
    expect(guard).toBeTruthy();
  }));
});
