import { TestBed } from '@angular/core/testing';

import { NgxSimpleCountdownService } from './ngx-simple-countdown.service';

describe('NgxSimpleCountdownService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxSimpleCountdownService = TestBed.get(NgxSimpleCountdownService);
    expect(service).toBeTruthy();
  });
});
