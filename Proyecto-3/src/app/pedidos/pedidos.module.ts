import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosListadoComponent } from './pedidos-listado/pedidos-listado.component';
import { PedidosDetalleComponent } from './pedidos-detalle/pedidos-detalle.component';
import { PedidosApiClientService } from './pedidos-api-client.service';


@NgModule({
  declarations: [
    PedidosListadoComponent,
    PedidosDetalleComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule
  ],
  providers:[
    PedidosApiClientService
  ]
})
export class PedidosModule { }
