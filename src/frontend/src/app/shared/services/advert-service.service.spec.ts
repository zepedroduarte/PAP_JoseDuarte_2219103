import { TestBed } from '@angular/core/testing';

import { AdvertServiceService } from './advert-service.service';

describe('AdvertServiceService', () => {
  let service: AdvertServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
