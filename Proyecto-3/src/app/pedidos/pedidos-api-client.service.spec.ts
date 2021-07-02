import { TestBed } from '@angular/core/testing';

import { PedidosApiClientService } from './pedidos-api-client.service';

describe('PedidosApiClientService', () => {
  let service: PedidosApiClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidosApiClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
