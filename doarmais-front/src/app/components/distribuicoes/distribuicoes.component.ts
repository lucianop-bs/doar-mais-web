import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DistribuicaoResponse } from '../../models/cesta.model';

@Component({
  selector: 'app-distribuicoes',
  imports: [DatePipe],
  templateUrl: './distribuicoes.component.html',
  styleUrl: './distribuicoes.component.css',
})
export class DistribuicoesComponent {
  distribuicoes = input<DistribuicaoResponse[]>([]);
}
