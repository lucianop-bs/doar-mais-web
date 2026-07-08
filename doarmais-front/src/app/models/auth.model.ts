export interface LoginRequest {
  email: string;
  senha: string;
}

export interface CadastroRequest {
  nome: string;
  email: string;
  senha: string;
}

export interface LoginResponse {
  nome: string;
  id: number;
  isAdmin: boolean;
}

export interface CadastraUsuarioResponse {
  id: number;
}
