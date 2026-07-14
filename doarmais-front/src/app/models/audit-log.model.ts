export interface AuditLogResponse {
  id: number;
  usuario: string;
  acao: string;
  statusHttp: number;
  ip: string;
  dataHora: string;
}
