import { TestBed } from '@angular/core/testing';

import { NgxFieldErrorsService } from './ngx-field-errors.service';

describe('NgxFieldErrorsService', () => {
  let service: NgxFieldErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxFieldErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
