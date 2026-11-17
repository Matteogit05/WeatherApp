import { TestBed } from '@angular/core/testing';
import { WeatherCodeMapper } from './wc-mapper';

describe('WcMapper', () => {
  let service: WeatherCodeMapper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherCodeMapper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
