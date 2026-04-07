import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, MoreVertical } from 'lucide-react';
import { Bill } from '@/modules/notificacaoDuplicata/types/bill';
import { formatCurrency } from '@/modules/notificacaoDuplicata/utils/format';
import { AUTO_ANALYSIS_STATUSES } from '@/modules/notificacaoDuplicata/utils/statusConfig';
import { ROUTES } from '@/constants/routes';
import { BillDetailsPanel } from './BillDetailsPanel';

interface ExpandableRowProps {
  bill: Bill;
}

export function ExpandableRow({ bill }: ExpandableRowProps) {
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const getStatusBadge = () => {
    switch (bill.statusManifestacao) {
      case 'pendente':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-900 border border-gray-200">Pendente</span>;
      case 'aceito':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">Aceita</span>;
      case 'aceito_decurso_prazo':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">Aceita por Decurso</span>;
      case 'rejeitado':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">Rejeitada</span>;
      default:
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">-</span>;
    }
  };

  const isPending = bill.statusManifestacao === 'pendente';
  const isInAutoAnalysis = AUTO_ANALYSIS_STATUSES.includes(bill.statusManifestacao);
  const showManifestationActions = isPending || isInAutoAnalysis;

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors border-b border-gray-200">
        <td className="px-4 py-4 text-sm text-gray-900">{bill.id}</td>
        <td className="px-4 py-4 text-sm text-gray-900">{bill.sacador.name}</td>
        <td className="px-4 py-4 text-sm text-gray-900">{bill.issueDate}</td>
        <td className="px-4 py-4 text-sm text-gray-900">{bill.dueDate}</td>
        <td className="px-4 py-4 text-sm text-gray-900 text-right font-semibold">
          {formatCurrency(bill.amount)}
        </td>
        <td className="px-4 py-4 text-sm text-gray-900 text-center">
          {getStatusBadge()}
        </td>
        <td className="px-4 py-4 relative w-[80px] text-center">
          <div className="flex items-center justify-center gap-1">
            <button
              onClick={() => setShowDetailModal(true)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="Ver detalhes"
            >
              <Eye size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowActions(!showActions);
              }}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors inline-flex items-center justify-center"
              title="Ações"
            >
              <MoreVertical size={18} className="text-gray-600" />
            </button>
          </div>
          {showActions && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowActions(false);
                }}
              />
              <div className="absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                <button
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/${ROUTES.NOTIFICACOES_DUPLICATAS_MANIFESTACAO}?id=${bill.id}`);
                    setShowActions(false);
                  }}
                >
                  Manifestação
                </button>
                {showManifestationActions ? (
                  <>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      disabled={isInAutoAnalysis}
                      className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                        isInAutoAnalysis
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-green-700 hover:bg-green-50'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isInAutoAnalysis) setShowActions(false);
                      }}
                    >
                      Aceitar
                    </button>
                    <button
                      disabled={isInAutoAnalysis}
                      className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                        isInAutoAnalysis
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-red-600 hover:bg-red-50'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isInAutoAnalysis) setShowActions(false);
                      }}
                    >
                      Recusar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/app/${ROUTES.NOTIFICACOES_DUPLICATAS_MANIFESTACAO}?id=${bill.id}`);
                        setShowActions(false);
                      }}
                    >
                      Alterar Manifestação
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </td>
      </tr>
      {showDetailModal && (
        <tr>
          <td colSpan={7} className="p-0">
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[1000]" onClick={() => setShowDetailModal(false)}>
              <div className="w-[900px] max-w-[90vw] h-[90vh]" onClick={(e) => e.stopPropagation()}>
                <BillDetailsPanel
                  bill={bill}
                  onClose={() => setShowDetailModal(false)}
                />
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
