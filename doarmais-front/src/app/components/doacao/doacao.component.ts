import { Component, computed, inject, OnInit, output, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { DoacaoRequest } from '../../models/doacao.model';
import { TipoItemResponse } from '../../models/tipo-item.model';
import { DoacaoService } from '../../services/doacao/doacao.service';
import { TipoItemService } from '../../services/tipo-item/tipo-item.service';

@Component({
  selector: 'app-doacao',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './doacao.component.html',
  styleUrl: './doacao.component.css',
})
export class DoacaoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private doacaoService = inject(DoacaoService);
  private tipoItemService = inject(TipoItemService);

  doacaoSalva = output<void>();

  tiposItem = signal<TipoItemResponse[]>([]);
  listaDeItens = signal<DoacaoRequest[]>([]);
  errorMessage = signal<string | null>(null);
  mostrarDropdown = false;

  formItensDoacao: FormGroup = this.fb.group({
    item: ['', Validators.required],
    quantidade: [1, [Validators.required, Validators.min(1)]],
  });

  textoDigitado = toSignal(this.formItensDoacao.get('item')!.valueChanges, { initialValue: '' });

  produtosFiltrados = computed(() => {
    const texto = (this.textoDigitado() ?? '').toLowerCase();
    return this.tiposItem().filter(
      (t) =>
        t.descricao.toLowerCase().includes(texto) || t.nome.toLowerCase().includes(texto),
    );
  });

  ngOnInit() {
    this.tipoItemService.listar().subscribe({
      next: (tipos) => this.tiposItem.set(tipos),
      error: () => this.errorMessage.set('Erro ao carregar catálogo de itens.'),
    });
  }

  onDoacaoSubmit() {
    if (!this.formItensDoacao.valid) return;
    const v = this.formItensDoacao.value as DoacaoRequest;
    this.adicionarItem({ item: v.item, quantidade: Number(v.quantidade) });
  }

  adicionarItem(novoItem: DoacaoRequest) {
    const existente = this.listaDeItens().find((i) => i.item === novoItem.item);
    if (existente) {
      this.listaDeItens.update((itens) =>
        itens.map((i) =>
          i.item === novoItem.item ? { ...i, quantidade: i.quantidade + novoItem.quantidade } : i,
        ),
      );
    } else {
      if (this.listaDeItens().length >= 20) return;
      this.listaDeItens.update((itens) => [...itens, novoItem]);
    }
  }

  adicionarCesta() {
    this.tiposItem().forEach((t) => this.adicionarItem({ item: t.nome, quantidade: 1 }));
  }

  removerItem(index: number) {
    this.listaDeItens.update((itens) => itens.filter((_, i) => i !== index));
  }

  selecionarItem(tipo: TipoItemResponse) {
    this.formItensDoacao.get('item')?.setValue(tipo.nome);
    this.mostrarDropdown = false;
  }

  esconderDropdown() {
    setTimeout(() => (this.mostrarDropdown = false), 150);
  }

  salvar() {
    if (this.listaDeItens().length === 0) return;
    this.doacaoService.cadastrarDoacao(this.listaDeItens()).subscribe({
      next: () => {
        this.listaDeItens.set([]);
        this.errorMessage.set(null);
        this.doacaoSalva.emit();
      },
      error: (err) => this.errorMessage.set(err?.error?.message ?? 'Erro ao salvar doação.'),
    });
  }

  descricaoDe(nome: string): string {
    return this.tiposItem().find((t) => t.nome === nome)?.descricao ?? nome;
  }
}
