import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { StoreModule as NgRxStoreModule, ActionReducerMap} from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { FrutaFavoritaComponent } from './components/fruta-favorita/fruta-favorita.component';
import { ListaFrutasComponent } from './components/lista-frutas/lista-frutas.component';
import { FrutaDetalleComponent } from './components/fruta-detalle/fruta-detalle.component';
import { FormFrutaFavoritaComponent } from './components/form-fruta-favorita/form-fruta-favorita.component';
import { FrutasApiClient } from './models/fruta-api-client.model';
import { FrutaFavoritaState, reducerFrutasFavoritas, initializeFrutasFavoritasState, FrutaFavoritaEffects } from './models/fruta-favorita-state.model';
import { LoginComponent } from './components/login/login.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { AuthService } from './services/auth.service';
import { UsuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: ListaFrutasComponent },
    { path: 'destino/:id', component: FrutaDetalleComponent },
    { path: 'login', component: LoginComponent },
    {
      path: 'protected',
      component: ProtectedComponent,
      canActivate: [ UsuarioLogueadoGuard ]
    }
]

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
    ProtectedComponent
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
      }})
    
  ],
  providers: [FrutasApiClient, AuthService, UsuarioLogueadoGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
