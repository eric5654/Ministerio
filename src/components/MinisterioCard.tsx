import { MessageSquare } from 'lucide-react';
import type { Ministerio } from '../lib/types';

interface MinisterioCardProps {
  ministerio: Ministerio;
  totalChamados: number;
  pendentes: number;
  onClick: () => void;
}

const ministerioIcons: Record<Ministerio, string> = {
  'Comunicação': '📢',
  'Recepção': '🤝',
  'Ornamentação': '🌸'
};

const ministerioColors: Record<Ministerio, { bg: string; text: string; border: string }> = {
  'Comunicação': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  'Recepção': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  'Ornamentação': { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' }
};

export function MinisterioCard({ ministerio, totalChamados, pendentes, onClick }: MinisterioCardProps) {
  const colors = ministerioColors[ministerio];

  return (
    <button
      onClick={onClick}
      className={`${colors.bg} ${colors.border} border-2 rounded-xl p-6 text-left hover:shadow-lg transition-all duration-200 hover:scale-105 w-full`}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl">{ministerioIcons[ministerio]}</span>
        <MessageSquare className={`${colors.text} w-6 h-6`} />
      </div>

      <h3 className={`${colors.text} text-xl font-bold mb-2`}>{ministerio}</h3>

      <div className="flex items-center gap-4 text-sm">
        <div>
          <span className="text-gray-600">Total: </span>
          <span className="font-semibold text-gray-900">{totalChamados}</span>
        </div>
        <div>
          <span className="text-gray-600">Pendentes: </span>
          <span className={`font-semibold ${pendentes > 0 ? 'text-red-600' : 'text-gray-900'}`}>
            {pendentes}
          </span>
        </div>
      </div>
    </button>
  );
}
