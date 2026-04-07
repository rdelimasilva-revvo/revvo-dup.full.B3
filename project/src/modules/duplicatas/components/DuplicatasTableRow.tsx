import { useState } from 'react';
import { X } from '@phosphor-icons/react';
import { Duplicata } from '../types/duplicata';

interface DuplicatasTableRowProps {
  duplicata: Duplicata;
}

function formatCurrency(value: number): string {
  return value.toFixed(2).replace('.', ',');
}

export function DuplicatasTableRow({ duplicata }: DuplicatasTableRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isNegociada = duplicata.statusNegociacao === 'negociada';

  return (
    <>
      <tr
        onClick={() => setIsExpanded(!isExpanded)}
        className="hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-200"
      >
        <td className="px-4 py-4 text-sm text-gray-900 font-medium">
          {duplicata.numeroDuplicata}
        </td>
        <td className="px-4 py-4 text-sm text-gray-900">
          <div>{duplicata.sacador.name}</div>
          <div className="text-xs text-gray-500">{duplicata.sacador.cnpj}</div>
        </td>
        <td className="px-4 py-4 text-sm text-gray-900">
          <div>{duplicata.sacado.name}</div>
          <div className="text-xs text-gray-500">{duplicata.sacado.cnpj}</div>
        </td>
        <td className="px-4 py-4 text-sm text-gray-900">{duplicata.dataEmissao}</td>
        <td className="px-4 py-4 text-sm text-gray-900">{duplicata.dataVencimento}</td>
        <td className="px-4 py-4 text-sm text-gray-900 text-right font-semibold">
          R$ {formatCurrency(duplicata.valor)}
        </td>
        <td className="px-4 py-4 text-sm text-center">
          {isNegociada ? (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
              Negociada
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200">
              Não negociada
            </span>
          )}
        </td>
      </tr>

      {isExpanded && (
        <tr className="border-b border-gray-200">
          <td colSpan={7} className="p-0">
            <div className="bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  Duplicata {duplicata.numeroDuplicata}
                  <span className={`text-sm font-normal px-2 py-0.5 rounded-full ${
                    isNegociada
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {isNegociada ? 'Negociada' : 'Não negociada'}
                  </span>
                </h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                  className="h-9 w-9 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-6 px-6 py-4 bg-white">
                <div>
                  <h4 className="text-xs text-gray-500 mb-1">Valor</h4>
                  <p className="text-sm text-gray-900 font-medium">R$ {formatCurrency(duplicata.valor)}</p>
                </div>
                <div>
                  <h4 className="text-xs text-gray-500 mb-1">Sacador</h4>
                  <p className="text-sm text-gray-900">{duplicata.sacador.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{duplicata.sacador.cnpj}</p>
                </div>
                <div>
                  <h4 className="text-xs text-gray-500 mb-1">Sacado</h4>
                  <p className="text-sm text-gray-900">{duplicata.sacado.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{duplicata.sacado.cnpj}</p>
                </div>
                <div>
                  <h4 className="text-xs text-gray-500 mb-1">Domicílio Bancário</h4>
                  <p className="text-sm text-gray-900">{duplicata.banco}</p>
                </div>

                <div>
                  <h4 className="text-xs text-gray-500 mb-1">Data de Emissão</h4>
                  <p className="text-sm text-gray-900">{duplicata.dataEmissao}</p>
                </div>
                <div>
                  <h4 className="text-xs text-gray-500 mb-1">Data de Vencimento</h4>
                  <p className="text-sm text-gray-900">{duplicata.dataVencimento}</p>
                </div>
                <div>
                  <h4 className="text-xs text-gray-500 mb-1">Número da Nota</h4>
                  <p className="text-sm text-gray-900">{duplicata.numeroNota}</p>
                </div>
                <div>
                  <h4 className="text-xs text-gray-500 mb-1">Série</h4>
                  <p className="text-sm text-gray-900">{duplicata.serie}</p>
                </div>

                <div className="col-span-4">
                  <h4 className="text-xs text-gray-500 mb-1">Chave NFe</h4>
                  <p className="text-xs text-gray-900 break-all">{duplicata.chaveNFe}</p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
