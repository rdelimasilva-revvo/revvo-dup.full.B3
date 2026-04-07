import { useState, useMemo } from 'react';
import { DuplicatasTableHeader } from './DuplicatasTableHeader';
import { DuplicatasTableRow } from './DuplicatasTableRow';
import { Duplicata } from '../types/duplicata';

interface DuplicatasTableProps {
  duplicatas: Duplicata[];
}

export function DuplicatasTable({ duplicatas }: DuplicatasTableProps) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(duplicatas.length / itemsPerPage));

  const visibleDuplicatas = useMemo(
    () => duplicatas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [duplicatas, currentPage, itemsPerPage]
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <DuplicatasTableHeader />
          <tbody>
            {visibleDuplicatas.map((duplicata) => (
              <DuplicatasTableRow key={duplicata.id} duplicata={duplicata} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-t border-gray-200">
        <span className="text-sm text-gray-500">
          {duplicatas.length} duplicata{duplicatas.length !== 1 ? 's' : ''} encontrada{duplicatas.length !== 1 ? 's' : ''}
        </span>
        <div className="flex gap-2">
          {currentPage > 1 && (
            <button
              className="h-9 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Anterior
            </button>
          )}
          {currentPage < totalPages && (
            <button
              className="h-9 px-4 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Próxima
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
