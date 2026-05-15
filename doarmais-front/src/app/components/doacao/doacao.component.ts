import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { DoacaoRequest } from '../../models/doacao.model';
import { ItensDoacao } from '../../models/itens.models';
import { DoacaoService } from '../../services/doacao/doacao.service';

@Component({
  selector: 'app-doacao',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './doacao.component.html',
  styleUrl: './doacao.component.css',
})
export class DoacaoComponent {
  // Injeções de dependência
  private fb = inject(FormBuilder);
  private doacaoService = inject(DoacaoService);

  listaDeItens = signal<DoacaoRequest[]>([]);
  errorMessage = signal<string | null>(null);
  mostrarDropdown = false;

  // Dados Auxiliares
  listaProdutos = ItensDoacao;

  itensCestaBasica: DoacaoRequest[] = ItensDoacao.map((produto) => ({
    item: produto,
    quantidade: 1,
  }));

  // Formulário
  formItensDoacao: FormGroup = this.fb.group({
    item: ['', Validators.required],
    quantidade: [1, Validators.required],
  });

  // Sinais Derivados
  textoDigitado = toSignal(this.formItensDoacao.get('item')!.valueChanges, { initialValue: '' });

  produtosFiltrados = computed(() => {
    const texto = this.textoDigitado()?.toLowerCase() || '';
    return this.listaProdutos.filter((produto) => produto.toLowerCase().includes(texto));
  });

  /**
   * Submete o item do formulário para a lista temporária.
   */
  onDoacaoSubmit() {
    if (this.formItensDoacao.valid) {
      const dados = this.formItensDoacao.value as DoacaoRequest;
      this.adicionarItem(dados);
    }
  }

  /**
   * Adiciona um item à lista ou atualiza a quantidade se já existir.
   */
  adicionarItem(novoItem: DoacaoRequest) {
    const itemJaExiste = this.listaDeItens().find((i) => i.item === novoItem.item);

    if (itemJaExiste) {
      this.listaDeItens.update((itensAtuais) =>
        itensAtuais.map((i) =>
          i.item === novoItem.item
            ? { ...i, quantidade: Number(i.quantidade) + Number(novoItem.quantidade) }
            : i,
        ),
      );
    } else {
      if (this.listaDeItens().length >= 10) {
        return;
      }

      this.listaDeItens.update((itensAtuais) => [
        ...itensAtuais,
        { item: novoItem.item, quantidade: Number(novoItem.quantidade) },
      ]);
    }
  }

  /**
   * Adiciona todos os itens pré-definidos da cesta básica.
   */
  adicionarCesta() {
    this.itensCestaBasica.forEach((itemCesta) => {
      this.adicionarItem(itemCesta);
    });
  }

  /**
   * Remove um item da lista pelo índice.
   */
  removerItem(index: number) {
    this.listaDeItens.update((itens) => itens.filter((_, indexAtual) => indexAtual !== index));
  }

  /**
   * Seleciona um item do dropdown de autocomplete.
   */
  selecionarItem(produto: string) {
    this.formItensDoacao.get('item')?.setValue(produto);
    this.mostrarDropdown = false;
  }

  /**
   * Fecha o dropdown com um pequeno delay para permitir o clique no item.
   */
  esconderDropdown() {
    setTimeout(() => {
      this.mostrarDropdown = false;
    }, 150);
  }

  /**
   * Envia a lista de itens para o servidor.
   */
  salvar() {
    this.doacaoService.cadastrarDoacao(this.listaDeItens()).subscribe({
      next: (res) => {
        this.listaDeItens.set([]);
        this.errorMessage.set(null);
      },
      error: (err) => {
        this.errorMessage.set(err.error.message);
      },
    });
  }
}
