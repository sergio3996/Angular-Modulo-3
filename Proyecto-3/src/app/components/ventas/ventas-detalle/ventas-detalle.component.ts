import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ventas-detalle',
  templateUrl: './ventas-detalle.component.html',
  styleUrls: ['./ventas-detalle.component.css']
})
export class VentasDetalleComponent implements OnInit {

  id: any;
  constructor(private route: ActivatedRoute) {
    route.params.subscribe(params => { this.id = params['id']; });
  }

  ngOnInit(): void {
  }

}
