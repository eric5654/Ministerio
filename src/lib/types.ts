export type Ministerio = 'Comunicação' | 'Recepção' | 'Ornamentação';
export type Status = 'Pendente' | 'Em Andamento' | 'Concluído';

export interface Chamado {
  id: string;
  ministerio: Ministerio;
  descricao: string;
  solicitante: string;
  status: Status;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      chamados: {
        Row: Chamado;
        Insert: Omit<Chamado, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Chamado, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}
