import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidosListadoComponent } from './pedidos-listado/pedidos-listado.component';
import { PedidosDetalleComponent } from './pedidos-detalle/pedidos-detalle.component';

const routes: Routes = [
  { path: 'pedidos',  component: PedidosListadoComponent },
  { path: 'pedidos/:id',  component: PedidosDetalleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }