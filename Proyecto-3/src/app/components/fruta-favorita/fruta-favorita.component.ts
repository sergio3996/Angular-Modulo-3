import { Component, OnInit, Input, HostBinding, Output, EventEmitter} from '@angular/core';
import { FrutaFavorita } from './../../models/fruta-favorita.model';
import { Store } from "@ngrx/store"
import { AppState } from './../../app.module';
import { VoteDownAction, VoteUpAction } from './../../models/fruta-favorita-state.model';

@Component({
  selector: 'app-fruta-favorita',
  templateUrl: './fruta-favorita.component.html',
  styleUrls: ['./fruta-favorita.component.css']
})
export class FrutaFavoritaComponent implements OnInit {
  @Input() fruta!: FrutaFavorita;
  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Output() clicked: EventEmitter<FrutaFavorita>;

  constructor(private store: Store<AppState>) { 
    this.clicked = new EventEmitter();
  }

  ngOnInit(): void {
  }

  Ir(){
  this.clicked.emit(this.fruta);
  return false;
}

  voteUp(){
    this.store.dispatch(new VoteUpAction(this.fruta))
    return false;
  }

  voteDown(){
    this.store.dispatch(new VoteDownAction(this.fruta))
    return false;
  }

}
