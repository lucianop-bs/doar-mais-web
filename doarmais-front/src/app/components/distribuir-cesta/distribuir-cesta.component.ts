import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DistribuicaoRequest } from '../../models/cesta.model';

@Component({
  selector: 'app-distribuir-cesta',
  imports: [ReactiveFormsModule],
  templateUrl: './distribuir-cesta.component.html',
  styleUrl: './distribuir-cesta.component.css',
})
export class DistribuirCestaComponent {
  private fb = inject(FormBuilder);

  distribuir = output<DistribuicaoRequest>();

  form: FormGroup = this.fb.group({
    beneficiario: ['', [Validators.required, Validators.minLength(3)]],
    quantidadeCestas: [1, [Validators.required, Validators.min(1)]],
  });

  onSubmit() {
    if (this.form.valid) {
      this.distribuir.emit(this.form.value as DistribuicaoRequest);
      this.form.reset({ beneficiario: '', quantidadeCestas: 1 });
    }
  }
}
