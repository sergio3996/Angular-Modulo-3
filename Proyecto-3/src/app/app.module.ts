import { APP_INITIALIZER, Injectable, InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { StoreModule as NgRxStoreModule, ActionReducerMap, Store} from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects';

import { HttpClientModule, HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http'

import { AppComponent } from './app.component';
import { FrutaFavoritaComponent } from './components/fruta-favorita/fruta-favorita.component';
import { ListaFrutasComponent } from './components/lista-frutas/lista-frutas.component';
import { FrutaDetalleComponent } from './components/fruta-detalle/fruta-detalle.component';
import { FormFrutaFavoritaComponent } from './components/form-fruta-favorita/form-fruta-favorita.component';
import { FrutasApiClient } from './models/fruta-api-client.model';
import { FrutaFavoritaState, reducerFrutasFavoritas, initializeFrutasFavoritasState, FrutaFavoritaEffects, InitMyDataAction } from './models/fruta-favorita-state.model';
import { LoginComponent } from './components/login/login.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { AuthService } from './services/auth.service';
import { UsuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado.guard';
import { VentasComponent } from './components/ventas/ventas/ventas.component';
import { VentasMainComponent } from './components/ventas/ventas-main/ventas-main.component';
import { VentasMasInfoComponent } from './components/ventas/ventas-mas-info/ventas-mas-info.component';
import { VentasDetalleComponent } from './components/ventas/ventas-detalle/ventas-detalle.component';
import { PedidosModule } from './pedidos/pedidos.module';


// app config
export interface AppConfig {
  apiEndpoint: String;
}
const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'http://localhost:3000'
};
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
// fin app config

export const childrenRoutesVentas: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: VentasMainComponent },
  { path: 'mas-info', component: VentasMainComponent },
  { path: ':id', component: VentasDetalleComponent },
];



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: ListaFrutasComponent },
    { path: 'fruta', component: FrutaDetalleComponent },
    { path: 'login', component: LoginComponent },
    {
      path: 'protected',
      component: ProtectedComponent,
      canActivate: [ UsuarioLogueadoGuard ]
    },
    {
      path: 'ventas',
      component: VentasComponent,
      canActivate: [ UsuarioLogueadoGuard ],
      children: childrenRoutesVentas
    }
]



// app init
export function init_app(appLoadService: AppLoadService): () => Promise<any>  {
  return () => appLoadService.initializeFrutasFavoritasState();
}

@Injectable()
class AppLoadService {
  constructor(private store: Store<AppState>, private http: HttpClient) { }
  async initializeFrutasFavoritasState(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    const req = new HttpRequest('GET', APP_CONFIG_VALUE.apiEndpoint + '/my', { headers: headers });
    const response: any = await this.http.request(req).toPromise();
    this.store.dispatch(new InitMyDataAction(response.body));
  }
}

// fin app init


//redux init
export interface AppState {
  frutas: FrutaFavoritaState;
};

const reducers: ActionReducerMap<AppState> = {
   frutas: reducerFrutasFavoritas
};

let reducersInitialState = {
    frutas: initializeFrutasFavoritasState()
};
//fin redux init



@NgModule({
  declarations: [
    AppComponent,
    FrutaFavoritaComponent,
    ListaFrutasComponent,
    FrutaDetalleComponent,
    FormFrutaFavoritaComponent,
    LoginComponent,
    ProtectedComponent,
    VentasComponent,
    VentasMainComponent,
    VentasMasInfoComponent,
    VentasDetalleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    NgRxStoreModule.forRoot(reducers,{ initialState: reducersInitialState,
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      }}),
    PedidosModule,
    HttpClientModule
    
  ],
  providers: [FrutasApiClient, AuthService, UsuarioLogueadoGuard, 
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE }, 
    AppLoadService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true }],
  bootstrap: [AppComponent]
})

export class AppModule { }
