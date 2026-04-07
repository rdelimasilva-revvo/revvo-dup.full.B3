import React, { useState } from 'react';
import {
  Handshake,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Filter
} from 'lucide-react';

const mockNegociacoes = [
  { id: 1, fornecedor: 'Fornecedor Alpha Ltda', duplicatas: 45, valor: 2850000, status: 'em_andamento', prazo: '2026-04-15', desconto: 2.5, responsavel: 'Ana Costa' },
  { id: 2, fornecedor: 'Beta Indústria S.A.', duplicatas: 32, valor: 1980000, status: 'concluida', prazo: '2026-04-10', desconto: 3.2, responsavel: 'Carlos Silva' },
  { id: 3, fornecedor: 'Gamma Comércio Ltda', duplicatas: 18, valor: 920000, status: 'pendente', prazo: '2026-04-20', desconto: 0, responsavel: 'Maria Santos' },
  { id: 4, fornecedor: 'Delta Serviços S.A.', duplicatas: 27, valor: 1450000, status: 'em_andamento', prazo: '2026-04-18', desconto: 1.8, responsavel: 'Ana Costa' },
  { id: 5, fornecedor: 'Epsilon Tech Ltda', duplicatas: 12, valor: 680000, status: 'concluida', prazo: '2026-04-08', desconto: 4.0, responsavel: 'Pedro Almeida' },
  { id: 6, fornecedor: 'Zeta Logística S.A.', duplicatas: 38, valor: 2100000, status: 'cancelada', prazo: '2026-04-12', desconto: 0, responsavel: 'Carlos Silva' },
  { id: 7, fornecedor: 'Eta Distribuidora Ltda', duplicatas: 22, valor: 1150000, status: 'pendente', prazo: '2026-04-25', desconto: 0, responsavel: 'Maria Santos' },
  { id: 8, fornecedor: 'Theta Materiais S.A.', duplicatas: 15, valor: 780000, status: 'em_andamento', prazo: '2026-04-22', desconto: 2.0, responsavel: 'Pedro Almeida' },
];

const summaryData = {
  totalNegociacoes: 156,
  emAndamento: 42,
  concluidas: 89,
  pendentes: 18,
  canceladas: 7,
  valorTotalNegociado: 45800000,
  descontoMedio: 2.8,
  prazoMedio: 12,
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const formatCurrencyCompact = (value: number) => {
  if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `R$ ${(value / 1000).toFixed(0)}K`;
  return formatCurrency(value);
};

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  em_andamento: { label: 'Em Andamento', color: 'bg-blue-100 text-blue-800', icon: <Clock className="w-3.5 h-3.5" /> },
  concluida: { label: 'Concluída', color: 'bg-green-100 text-green-800', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  pendente: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800', icon: <AlertTriangle className="w-3.5 h-3.5" /> },
  cancelada: { label: 'Cancelada', color: 'bg-red-100 text-red-800', icon: <XCircle className="w-3.5 h-3.5" /> },
};

const VisaoNegociacoes = () => {
  const [statusFilter, setStatusFilter] = useState<string>('todos');

  const filteredNegociacoes = mockNegociacoes.filter(n =>
    statusFilter === 'todos' || n.status === statusFilter
  );

  return (
    <div className="p-8 min-h-full max-h-full overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Visão de Negociações</h1>
          <p className="text-gray-500 mt-1">Acompanhamento das negociações com fornecedores</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <Handshake className="w-8 h-8 text-blue-600" />
              <div className="flex items-center text-sm text-green-600">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +12.3%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{summaryData.totalNegociacoes}</h3>
            <p className="text-sm font-medium text-gray-700">Total de Negociações</p>
            <p className="text-xs text-gray-500">Últimos 90 dias</p>
          </div>
          <div className="p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{formatCurrencyCompact(summaryData.valorTotalNegociado)}</h3>
            <p className="text-sm font-medium text-gray-700">Valor Total Negociado</p>
            <p className="text-xs text-gray-500">Volume financeiro acumulado</p>
          </div>
          <div className="p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <TrendingDown className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{summaryData.descontoMedio}%</h3>
            <p className="text-sm font-medium text-gray-700">Desconto Médio</p>
            <p className="text-xs text-gray-500">Obtido nas negociações</p>
          </div>
          <div className="p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{summaryData.prazoMedio} dias</h3>
            <p className="text-sm font-medium text-gray-700">Prazo Médio</p>
            <p className="text-xs text-gray-500">Para conclusão da negociação</p>
          </div>
        </div>

        {/* Status Overview */}
        <div className="p-6 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição por Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="text-3xl font-bold text-blue-700">{summaryData.emAndamento}</div>
              <div className="text-sm text-blue-600 font-medium mt-1">Em Andamento</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="text-3xl font-bold text-green-700">{summaryData.concluidas}</div>
              <div className="text-sm text-green-600 font-medium mt-1">Concluídas</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-100">
              <div className="text-3xl font-bold text-yellow-700">{summaryData.pendentes}</div>
              <div className="text-sm text-yellow-600 font-medium mt-1">Pendentes</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-100">
              <div className="text-3xl font-bold text-red-700">{summaryData.canceladas}</div>
              <div className="text-sm text-red-600 font-medium mt-1">Canceladas</div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="p-4 border-b border-gray-200 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="todos">Todos os Status</option>
              <option value="em_andamento">Em Andamento</option>
              <option value="concluida">Concluídas</option>
              <option value="pendente">Pendentes</option>
              <option value="cancelada">Canceladas</option>
            </select>
          </div>
        </div>

        {/* Negotiations Table */}
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Fornecedor</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Duplicatas</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Desconto</th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Prazo</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Responsável</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredNegociacoes.map((neg) => {
                  const statusInfo = statusConfig[neg.status];
                  return (
                    <tr key={neg.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-9 h-9 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                            {neg.fornecedor.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-900">{neg.fornecedor}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium text-right">
                        {neg.duplicatas}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium text-right">
                        {formatCurrencyCompact(neg.valor)}
                      </td>
                      <td className="px-6 py-4 text-sm text-right">
                        {neg.desconto > 0 ? (
                          <span className="text-green-700 font-medium">{neg.desconto}%</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          {statusInfo.icon}
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 text-center">
                        {new Date(neg.prazo).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {neg.responsavel}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredNegociacoes.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Nenhuma negociação encontrada com o filtro aplicado.
            </div>
          )}
        </div>
    </div>
  );
};

export default VisaoNegociacoes;
