import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FrutaFavorita } from './../../models/fruta-favorita.model';
import { FrutasApiClient } from './../../models/fruta-api-client.model';
import { Store } from '@ngrx/store'
import { AppState } from './../../app.module';
import { ElegidaFavoritaAction, NuevaFrutaAction } from './../../models/fruta-favorita-state.model';


@Component({
  selector: 'app-lista-frutas',
  templateUrl: './lista-frutas.component.html',
  styleUrls: ['./lista-frutas.component.css'],
  providers: [FrutasApiClient]
})
export class ListaFrutasComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<FrutaFavorita>
  updates: string[];
  all;
  
  constructor(public frutasApiClient:FrutasApiClient, private store: Store<AppState>) {
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.store.select(state => state.frutas.favorito)
    .subscribe(f => {
      if (f != null){
        this.updates.push('Se ha elegido a' + f.nombre)
      }
    });
    store.select(state => state.frutas.items).subscribe(items => this.all = items);
  }

  ngOnInit(): void {
  }


  agregado(f: FrutaFavorita) {
    
    this.frutasApiClient.add(f)
    
    this.onItemAdded.emit(f)
  }

  elegido(f: FrutaFavorita){
    
    this.store.dispatch(new ElegidaFavoritaAction(f));
  }

  

}
