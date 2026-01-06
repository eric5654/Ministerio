/*
  # Sistema de Chamados para Ministérios

  1. Nova Tabela
    - `chamados`
      - `id` (uuid, chave primária)
      - `ministerio` (text) - Nome do ministério (Comunicação, Recepção, Ornamentação)
      - `descricao` (text) - Descrição do chamado
      - `solicitante` (text) - Nome do solicitante
      - `status` (text) - Status do chamado (Pendente, Em Andamento, Concluído)
      - `created_at` (timestamptz) - Data de criação
      - `updated_at` (timestamptz) - Data de atualização

  2. Segurança
    - Habilitar RLS na tabela `chamados`
    - Políticas para permitir leitura pública
    - Políticas para permitir inserção pública
    - Políticas para permitir atualização pública
*/

CREATE TABLE IF NOT EXISTS chamados (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ministerio text NOT NULL CHECK (ministerio IN ('Comunicação', 'Recepção', 'Ornamentação')),
  descricao text NOT NULL,
  solicitante text NOT NULL,
  status text NOT NULL DEFAULT 'Pendente' CHECK (status IN ('Pendente', 'Em Andamento', 'Concluído')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE chamados ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos podem visualizar chamados"
  ON chamados FOR SELECT
  USING (true);

CREATE POLICY "Todos podem criar chamados"
  ON chamados FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Todos podem atualizar chamados"
  ON chamados FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Todos podem deletar chamados"
  ON chamados FOR DELETE
  USING (true);