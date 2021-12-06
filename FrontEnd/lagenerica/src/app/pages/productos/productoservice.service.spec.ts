import { TestBed } from '@angular/core/testing';

import { ProductoserviceService } from './productoservice.service';

describe('ProductoserviceService', () => {
  let service: ProductoserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
