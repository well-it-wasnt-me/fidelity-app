import { TestBed } from '@angular/core/testing';

import { TranslateConfigService } from './translate-config.service';

describe('TranslateConfigService', () => {
  let service: TranslateConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
