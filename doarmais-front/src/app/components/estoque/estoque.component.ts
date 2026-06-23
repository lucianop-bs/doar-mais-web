import { Component, input } from '@angular/core';
import { EstoqueResponse } from '../../models/cesta.model';

@Component({
  selector: 'app-estoque',
  imports: [],
  templateUrl: './estoque.component.html',
  styleUrl: './estoque.component.css',
})
export class EstoqueComponent {
  estoque = input<EstoqueResponse[]>([]);
}
