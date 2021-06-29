import { Injectable } from '@angular/core'
import { FrutaFavorita } from './fruta-favorita.model';
import { BehaviorSubject, Subject } from 'rxjs'
import { Store } from '@ngrx/store'
import { AppState } from '../app.module';
import { ElegidaFavoritaAction, NuevaFrutaAction } from './fruta-favorita-state.model';

@Injectable()

export class FrutasApiClient {
	frutas: FrutaFavorita[];
	current: Subject<FrutaFavorita> = new BehaviorSubject<FrutaFavorita>(null);
	
	constructor(private store: Store<AppState>) {
       this.frutas = [];
	}
	add(f:FrutaFavorita){
	  this.store.dispatch(new NuevaFrutaAction(f));
	}
	elegir(f: FrutaFavorita){
		this.store.dispatch(new ElegidaFavoritaAction(f));
	}
}