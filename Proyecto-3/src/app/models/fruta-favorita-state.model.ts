import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FrutaFavorita } from './fruta-favorita.model';
import { HttpClientModule, HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http'

//ESTADO
export interface FrutaFavoritaState {
	items: FrutaFavorita[];
	loading: boolean;
	favorito: FrutaFavorita;
}

export function initializeFrutasFavoritasState() {
	return {
		items: [],
		loading: false,
		favorito: null
	}
}

//ACCIONES
export enum FrutaFavoritaActionTypes {
	NUEVA_FRUTA = '[Fruta Favorita] Nuevo',
	ELEGIDA_FAVORITA = '[Fruta Favorita] Favorito',
	VOTE_UP = '[Fruta Favorita] Vote Up',
	VOTE_DOWN = '[Fruta Favorita] Vote Down',
	INIT_MY_DATA = '[Fruta Favorita] Init My Data'

}

export class NuevaFrutaAction implements Action {
	type = FrutaFavoritaActionTypes.NUEVA_FRUTA;
	constructor(public fruta: FrutaFavorita) { }
}

export class ElegidaFavoritaAction implements Action {
	type = FrutaFavoritaActionTypes.ELEGIDA_FAVORITA;
	constructor(public fruta: FrutaFavorita) { }
}

export class VoteUpAction implements Action {
	type = FrutaFavoritaActionTypes.VOTE_UP;
	constructor(public fruta: FrutaFavorita) { }
}

export class VoteDownAction implements Action {
	type = FrutaFavoritaActionTypes.VOTE_DOWN;
	constructor(public fruta: FrutaFavorita) { }
}

export class InitMyDataAction implements Action {
	type = FrutaFavoritaActionTypes.INIT_MY_DATA;
	constructor(public frutas: string[]) {}
  }

export type FrutaFavoritaActions = NuevaFrutaAction | ElegidaFavoritaAction | VoteUpAction | VoteDownAction | InitMyDataAction;

//REDUCERS
export function reducerFrutasFavoritas(
	state: FrutaFavoritaState,
	action: FrutaFavoritaActions
): FrutaFavoritaState {
	switch (action.type) {
		case FrutaFavoritaActionTypes.INIT_MY_DATA: {
			const frutas: string[] = (action as InitMyDataAction).frutas;
			return {
				...state,
				items: frutas.map((f) => new FrutaFavorita(f, "", ""))
			  };
		  }
		case FrutaFavoritaActionTypes.NUEVA_FRUTA: {
			return {
				...state,
				items: [...state.items, (action as NuevaFrutaAction).fruta]
			};
		}
		case FrutaFavoritaActionTypes.ELEGIDA_FAVORITA: {
			state.items.forEach(x => x.setSelected(false));
			let fav: FrutaFavorita = (action as ElegidaFavoritaAction).fruta;
			fav.setSelected(true);
			return {
				...state,
				favorito: fav
			};
		}
		case FrutaFavoritaActionTypes.VOTE_UP: {
			const d: FrutaFavorita = (action as VoteUpAction).fruta;
			d.voteUp();
			return {...state,};
		}
		case FrutaFavoritaActionTypes.VOTE_DOWN: {
			const d: FrutaFavorita = (action as VoteDownAction).fruta;
			d.voteDown();
			return {...state,};
		}
		
	}
	return state;
}

//EFFECTS
@Injectable()
export class FrutaFavoritaEffects {
	nuevoAgregado$ = createEffect(() =>
		this.actions$.pipe(
			ofType(FrutaFavoritaActionTypes.NUEVA_FRUTA),
			map((action: NuevaFrutaAction) => new ElegidaFavoritaAction(action.fruta))
		));

	constructor(private actions$: Actions) { }
}



