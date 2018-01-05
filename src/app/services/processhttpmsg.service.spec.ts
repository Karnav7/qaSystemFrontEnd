import { TestBed, inject } from '@angular/core/testing';

import { ProcesshttpmsgService } from './processhttpmsg.service';

describe('ProcesshttpmsgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcesshttpmsgService]
    });
  });

  it('should be created', inject([ProcesshttpmsgService], (service: ProcesshttpmsgService) => {
    expect(service).toBeTruthy();
  }));
});
