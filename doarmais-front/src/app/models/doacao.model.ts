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
