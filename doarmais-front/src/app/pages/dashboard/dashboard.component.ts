import { Component, inject, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';

import {
  DistribuicaoRequest,
  DistribuicaoResponse,
  EstoqueResponse,
} from '../../models/cesta.model';
import { DoacaoResponse } from '../../models/doacao.model';

import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component';
import { DistribuicoesComponent } from '../../components/distribuicoes/distribuicoes.component';
import { DistribuirCestaComponent } from '../../components/distribuir-cesta/distribuir-cesta.component';
import { DoacaoComponent } from '../../components/doacao/doacao.component';
import { EstoqueComponent } from '../../components/estoque/estoque.component';
import { HistoricoDoacoesComponent } from '../../components/historico-doacoes/historico-doacoes.component';

import { AuthService } from '../../services/auth/auth.service';
import { CestaService } from '../../services/cesta/cesta.service';
import { DoacaoService } from '../../services/doacao/doacao.service';
import { NotificacaoService } from '../../services/notificacao/notificacao.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    DashboardHeaderComponent,
    DoacaoComponent,
    HistoricoDoacoesComponent,
    DistribuicoesComponent,
    EstoqueComponent,
    DistribuirCestaComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private doacaoService = inject(DoacaoService);
  private cestaService = inject(CestaService);
  private authService = inject(AuthService);
  private notificacao = inject(NotificacaoService);

  isAdmin = this.authService.isAdmin;

  doacoes = signal<DoacaoResponse[]>([]);
  distribuicoes = signal<DistribuicaoResponse[]>([]);
  estoque = signal<EstoqueResponse[]>([]);
  total = signal<number>(0);
  carregando = signal<boolean>(false);

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.carregando.set(true);
    forkJoin({
      doacoes: this.doacaoService.listar(),
      distribuicoes: this.cestaService.listarDistribuicoes(),
      estoque: this.cestaService.listarEstoque(),
      total: this.cestaService.total(),
    }).subscribe({
      next: (r) => {
        this.doacoes.set(r.doacoes);
        this.distribuicoes.set(r.distribuicoes);
        this.estoque.set(r.estoque);
        this.total.set(r.total.total);
        this.carregando.set(false);
      },
      error: () => {
        this.carregando.set(false);
        this.notificacao.erro('Erro ao carregar dados do dashboard.');
      },
    });
  }

  removerDoacao(id: number) {
    this.doacaoService.remover(id).subscribe({
      next: () => {
        this.notificacao.sucesso('Doação removida.');
        this.refresh();
      },
      error: (err) =>
        this.notificacao.erro(err?.error?.message ?? 'Erro ao remover doação.'),
    });
  }

  distribuirCesta(req: DistribuicaoRequest) {
    this.cestaService.distribuir(req).subscribe({
      next: () => {
        this.notificacao.sucesso(`${req.quantidadeCestas} cesta(s) entregue(s) a ${req.beneficiario}.`);
        this.refresh();
      },
      error: (err) =>
        this.notificacao.erro(err?.error?.message ?? 'Erro ao distribuir cestas.'),
    });
  }
}
