import { forwardRef, Inject, Injectable } from '@angular/core'
import { FrutaFavorita } from './fruta-favorita.model';
import { BehaviorSubject, Subject } from 'rxjs'
import { Store } from '@ngrx/store'
import { AppState, APP_CONFIG, AppConfig, db } from '../app.module';
import { ElegidaFavoritaAction, NuevaFrutaAction } from './fruta-favorita-state.model';
import { HttpRequest, HttpHeaders, HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';

@Injectable()

export class FrutasApiClient {
	frutas: FrutaFavorita[] = [];
	
	constructor(private store: Store<AppState>, @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig, private http: HttpClient) {
		this.store
		  .select(state => state.frutas)
		  .subscribe((data) => {
			console.log('frutas sub store');
			console.log(data);
			this.frutas = data.items;
		  });
		this.store
		  .subscribe((data) => {
			console.log('all store');
			console.log(data);
		  });
	  }
	
	  add(f: FrutaFavorita) {
		const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
		const req = new HttpRequest('POST', this.config.apiEndpoint + '/my', { nuevo: f.nombre }, { headers: headers });
		this.http.request(req).subscribe((data: HttpResponse<{}>) => {
		  if (data.status === 200) {
			this.store.dispatch(new NuevaFrutaAction(f));
			const myDb = db;
        	myDb.frutas.add(f);
        	console.log('todas los frutas de la db!');
        	myDb.frutas.toArray().then(frutas => console.log(frutas))
		  }
		});
	  }
	
	  elegir(f: FrutaFavorita){
		this.store.dispatch(new ElegidaFavoritaAction(f));
	}
	
	getAll(){
		return this.frutas;
	}
}
