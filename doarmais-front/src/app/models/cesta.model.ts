export interface EstoqueResponse {
  item: string;
  quantidade: number;
}

export interface DistribuicaoResponse {
  id: number;
  beneficiario: string;
  quantidadeCestas: number;
  usuarioNome: string;
  dataDistribuicao: string;
}

export interface DistribuicaoRequest {
  beneficiario: string;
  quantidadeCestas: number;
}

export interface TotalCestasResponse {
  total: number;
}
