import { TestBed } from '@angular/core/testing';

import { UserInfoService } from './user-info.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('UserInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: UserInfoService = TestBed.get(UserInfoService);
    expect(service).toBeTruthy();
  });
});
