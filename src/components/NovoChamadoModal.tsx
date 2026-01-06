import { X } from 'lucide-react';
import { useState } from 'react';
import type { Ministerio } from '../lib/types';

interface NovoChamadoModalProps {
  onClose: () => void;
  onSubmit: (data: { ministerio: Ministerio; descricao: string; solicitante: string }) => void;
  ministerioSelecionado?: Ministerio;
}

export function NovoChamadoModal({ onClose, onSubmit, ministerioSelecionado }: NovoChamadoModalProps) {
  const [ministerio, setMinisterio] = useState<Ministerio>(ministerioSelecionado || 'Comunicação');
  const [descricao, setDescricao] = useState('');
  const [solicitante, setSolicitante] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ministerio, descricao, solicitante });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Novo Chamado</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ministério
            </label>
            <select
              value={ministerio}
              onChange={(e) => setMinisterio(e.target.value as Ministerio)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="Comunicação">📢 Comunicação</option>
              <option value="Recepção">🤝 Recepção</option>
              <option value="Ornamentação">🌸 Ornamentação</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seu Nome
            </label>
            <input
              type="text"
              value={solicitante}
              onChange={(e) => setSolicitante(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite seu nome"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição do Chamado
            </label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
              placeholder="Descreva o que você precisa..."
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Criar Chamado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
