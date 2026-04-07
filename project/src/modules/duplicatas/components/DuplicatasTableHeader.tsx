export function DuplicatasTableHeader() {
  return (
    <thead>
      <tr className="bg-gray-50 border-b border-gray-200">
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Nº Duplicata
        </th>
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Sacador
        </th>
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Sacado
        </th>
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Emissão
        </th>
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Vencimento
        </th>
        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Valor
        </th>
        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Status
        </th>
      </tr>
    </thead>
  );
}
