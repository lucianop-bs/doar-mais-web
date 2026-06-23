export interface UsuarioResponse {
  id: number;
  nome: string;
  email: string;
  isAdmin: boolean;
  isBeneficiario: boolean;
}

export interface UsuarioUpdateRequest {
  nome?: string;
  email?: string;
  isAdmin?: boolean;
}
