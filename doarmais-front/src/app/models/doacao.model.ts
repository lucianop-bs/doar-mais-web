export interface DoacaoRequest {
  item: string;
  quantidade: number;
}

export interface DoacaoResponse {
  id: number;
  item: string;
  quantidade: number;
  doador: string;
  data: string;
}
export interface CestaResponse {
  total: number;
}
export interface EstoqueResponse {
  nome: string;
  qtd: number;
}
