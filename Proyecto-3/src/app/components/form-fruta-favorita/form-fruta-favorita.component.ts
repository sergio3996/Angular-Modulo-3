import { Component, EventEmitter, forwardRef, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { AppConfig, APP_CONFIG } from 'src/app/app.module';
import { FrutaFavorita } from './../../models/fruta-favorita.model';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-form-fruta-favorita',
  templateUrl: './form-fruta-favorita.component.html',
  styleUrls: ['./form-fruta-favorita.component.css']
})
export class FormFrutaFavoritaComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<FrutaFavorita>
  fg: FormGroup
  minLongitud = 4;
  searchResults:string[];

  constructor(fb: FormBuilder, @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig) {
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre: new FormControl('', Validators.compose([
        Validators.required,
        this.nombreValidator,
        this.nombreValidatorParametrizable(this.minLongitud)
      ])),
      url: new FormControl(''),
      color: new FormControl('')
    })
  }

  ngOnInit(): void {
    const elemNombre = <HTMLInputElement>document.getElementById('nombre');
    fromEvent(elemNombre, 'input')
      .pipe(
        map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
        filter(text => text.length > 2),
        debounceTime(120),
        distinctUntilChanged(),
        switchMap((text: string) => ajax(this.config.apiEndpoint + '/frutas?q=' + text))
      ).subscribe(ajaxResponse => this.searchResults = ajaxResponse.response);
  }

  guardar(nombre: string, url: string, color: string): boolean {
    const f = new FrutaFavorita(nombre, url, color);
    this.onItemAdded.emit(f);
    return false;
  }

  nombreValidator(control: FormControl): { [s: string]: boolean } | null {
    const l = control.value.toString().trim().length;
    if (l > 0 && l < 4) {
      return { invalidNombre: true };
    }
    return null;

  }

  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: AbstractControl): { [s: string]: boolean } | null => {
      const l = control.value.toString().trim().length;
      if (l > 0 && l < minLong) {
        return { minLongNombre: true };
      }
      return null;

    }
  }

}
