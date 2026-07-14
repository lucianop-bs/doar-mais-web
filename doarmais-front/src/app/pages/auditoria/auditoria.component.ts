import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuditLogResponse } from '../../models/audit-log.model';
import { AuditLogService } from '../../services/audit-log/audit-log.service';
import { NotificacaoService } from '../../services/notificacao/notificacao.service';

@Component({
  selector: 'app-auditoria',
  imports: [DatePipe, FormsModule],
  templateUrl: './auditoria.component.html',
  styleUrl: './auditoria.component.css',
})
export class AuditoriaComponent implements OnInit {
  private auditLogService = inject(AuditLogService);
  private notificacao = inject(NotificacaoService);
  private router = inject(Router);

  logs = signal<AuditLogResponse[]>([]);
  filtroUsuario = signal<string>('');
  filtroAcao = signal<string>('');

  logsFiltrados = computed(() => {
    const u = this.filtroUsuario().toLowerCase().trim();
    const a = this.filtroAcao().toLowerCase().trim();
    return this.logs().filter((l) => {
      const okUsuario = !u || l.usuario.toLowerCase().includes(u);
      const okAcao = !a || l.acao.toLowerCase().includes(a);
      return okUsuario && okAcao;
    });
  });

  ngOnInit() {
    this.recarregar();
  }

  recarregar() {
    this.auditLogService.listar().subscribe({
      next: (lista) => this.logs.set(lista),
      error: (err) => {
        if (err.status === 0 || err.status >= 500) return;
        this.notificacao.erro('Erro ao carregar logs de auditoria.');
      },
    });
  }

  classeStatus(status: number): string {
    if (status >= 500) return 'status-erro';
    if (status >= 400) return 'status-alerta';
    if (status >= 300) return 'status-info';
    return 'status-ok';
  }

  voltar() {
    this.router.navigate(['/dashboard']);
  }
}
