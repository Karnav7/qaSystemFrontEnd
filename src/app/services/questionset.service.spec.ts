import { TestBed, inject } from '@angular/core/testing';

import { QuestionsetService } from './questionset.service';

describe('QuestionsetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionsetService]
    });
  });

  it('should be created', inject([QuestionsetService], (service: QuestionsetService) => {
    expect(service).toBeTruthy();
  }));
});
