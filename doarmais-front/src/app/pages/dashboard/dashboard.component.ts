import { Component } from '@angular/core';
import { DoacaoComponent } from '../../components/doacao/doacao.component';

@Component({
  selector: 'app-dashboard',
  imports: [DoacaoComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
