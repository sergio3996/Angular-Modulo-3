import { Component, OnInit } from '@angular/core';
import { FrutasApiClient } from 'src/app/models/fruta-api-client.model';

@Component({
  selector: 'app-fruta-detalle',
  templateUrl: './fruta-detalle.component.html',
  styleUrls: ['./fruta-detalle.component.css'],
  providers: [FrutasApiClient]
})
export class FrutaDetalleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
