import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { DistribuicaoResponse } from '../../models/cesta.model';
import { DoacaoResponse } from '../../models/doacao.model';
import { CestaService } from '../../services/cesta/cesta.service';
import { DoacaoService } from '../../services/doacao/doacao.service';
import { NotificacaoService } from '../../services/notificacao/notificacao.service';

interface Ranking {
  nome: string;
  total: number;
}

@Component({
  selector: 'app-relatorios',
  imports: [DatePipe],
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.css',
})
export class RelatoriosComponent implements OnInit {
  private doacaoService = inject(DoacaoService);
  private cestaService = inject(CestaService);
  private notificacao = inject(NotificacaoService);
  private router = inject(Router);

  doacoes = signal<DoacaoResponse[]>([]);
  distribuicoes = signal<DistribuicaoResponse[]>([]);
  totalDisponivel = signal<number>(0);

  totalDistribuidas = computed(() =>
    this.distribuicoes().reduce((acc, d) => acc + d.quantidadeCestas, 0),
  );

  doadoresUnicos = computed(() => new Set(this.doacoes().map((d) => d.doador)).size);

  topDoadores = computed<Ranking[]>(() => {
    const mapa = new Map<string, number>();
    for (const d of this.doacoes()) {
      mapa.set(d.doador, (mapa.get(d.doador) ?? 0) + d.quantidade);
    }
    return [...mapa.entries()]
      .map(([nome, total]) => ({ nome, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  });

  topItens = computed<Ranking[]>(() => {
    const mapa = new Map<string, number>();
    for (const d of this.doacoes()) {
      mapa.set(d.item, (mapa.get(d.item) ?? 0) + d.quantidade);
    }
    return [...mapa.entries()]
      .map(([nome, total]) => ({ nome, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  });

  ultimasDistribuicoes = computed(() =>
    [...this.distribuicoes()]
      .sort((a, b) => (b.dataDistribuicao > a.dataDistribuicao ? 1 : -1))
      .slice(0, 5),
  );

  maxDoador = computed(() => Math.max(1, ...this.topDoadores().map((r) => r.total)));
  maxItem = computed(() => Math.max(1, ...this.topItens().map((r) => r.total)));

  ngOnInit() {
    forkJoin({
      doacoes: this.doacaoService.listar(),
      distribuicoes: this.cestaService.listarDistribuicoes(),
      total: this.cestaService.total(),
    }).subscribe({
      next: (r) => {
        this.doacoes.set(r.doacoes);
        this.distribuicoes.set(r.distribuicoes);
        this.totalDisponivel.set(r.total.total);
      },
      error: () => this.notificacao.erro('Erro ao carregar relatórios.'),
    });
  }

  porcentagem(valor: number, max: number): number {
    return Math.round((valor / max) * 100);
  }

  voltar() {
    this.router.navigate(['/dashboard']);
  }
}
