import { Component, OnInit } from '@angular/core';
import { PedidosApiClientService } from '../pedidos-api-client.service';

@Component({
  selector: 'app-pedidos-listado',
  templateUrl: './pedidos-listado.component.html',
  styleUrls: ['./pedidos-listado.component.css']
})
export class PedidosListadoComponent implements OnInit {

  constructor(public api: PedidosApiClientService) { }

  ngOnInit(): void {
  }

}
