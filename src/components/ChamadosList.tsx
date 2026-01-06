import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import type { Chamado, Status } from '../lib/types';

interface ChamadosListProps {
  chamados: Chamado[];
  onUpdateStatus: (id: string, status: Status) => void;
}

const statusConfig = {
  'Pendente': { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
  'Em Andamento': { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  'Concluído': { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' }
};

export function ChamadosList({ chamados, onUpdateStatus }: ChamadosListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (chamados.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Nenhum chamado encontrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {chamados.map((chamado) => {
        const config = statusConfig[chamado.status];
        const StatusIcon = config.icon;

        return (
          <div
            key={chamado.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">
                    {chamado.ministerio === 'Comunicação' && '📢'}
                    {chamado.ministerio === 'Recepção' && '🤝'}
                    {chamado.ministerio === 'Ornamentação' && '🌸'}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {chamado.ministerio}
                  </h3>
                </div>

                <p className="text-gray-700 mb-3">{chamado.descricao}</p>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>
                    <strong>Solicitante:</strong> {chamado.solicitante}
                  </span>
                  <span>
                    <strong>Data:</strong> {formatDate(chamado.created_at)}
                  </span>
                </div>
              </div>

              <div className={`${config.bg} ${config.border} border px-3 py-1.5 rounded-full flex items-center gap-2`}>
                <StatusIcon className={`${config.color} w-4 h-4`} />
                <span className={`${config.color} text-sm font-medium`}>
                  {chamado.status}
                </span>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-100">
              <button
                onClick={() => onUpdateStatus(chamado.id, 'Pendente')}
                disabled={chamado.status === 'Pendente'}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  chamado.status === 'Pendente'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-red-50 text-red-700 hover:bg-red-100'
                }`}
              >
                Pendente
              </button>
              <button
                onClick={() => onUpdateStatus(chamado.id, 'Em Andamento')}
                disabled={chamado.status === 'Em Andamento'}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  chamado.status === 'Em Andamento'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                }`}
              >
                Em Andamento
              </button>
              <button
                onClick={() => onUpdateStatus(chamado.id, 'Concluído')}
                disabled={chamado.status === 'Concluído'}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  chamado.status === 'Concluído'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-green-50 text-green-700 hover:bg-green-100'
                }`}
              >
                Concluído
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
