import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { FrutaFavorita } from './../../models/fruta-favorita.model';

@Component({
  selector: 'app-form-fruta-favorita',
  templateUrl: './form-fruta-favorita.component.html',
  styleUrls: ['./form-fruta-favorita.component.css']
})
export class FormFrutaFavoritaComponent implements OnInit {
@Output() onItemAdded: EventEmitter<FrutaFavorita>
  fg: FormGroup
  minLongitud = 4;

  constructor(fb: FormBuilder) { 
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre: new FormControl ('', Validators.compose([
        Validators.required,
        this.nombreValidator,
        this.nombreValidatorParametrizable(this.minLongitud)
      ])),
      url: new FormControl (''),
      color: new FormControl ('')
    })
  }

  ngOnInit(): void {
  }

  guardar(nombre: string, url: string, color: string):boolean {
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
