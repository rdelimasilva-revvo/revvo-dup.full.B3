import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  DollarSign,
  Eye,
  Download,
  Layers,
  X,
  ChevronDown,
  ArrowLeft,
  Files
} from 'lucide-react';
import { FunnelSimple } from '@phosphor-icons/react';

type StatusLote = 'processado' | 'aguardando' | 'em_processamento' | 'erro';

interface LoteCNAB {
  id: string;
  lote: string;
  dataEnvio: string;
  qtdPagamentos: number;
  valorTotal: number;
  status: StatusLote;
  banco: string;
  tipoArquivo: string;
}

interface DuplicataRelacionada {
  id: string;
  vencimento: string;
  valor: number;
  status: 'liquidada' | 'agendada' | 'pendente';
  notaFiscal: string;
  fornecedor: string;
  emissao: string;
  chaveAcesso: string;
}

const mockLotes: LoteCNAB[] = [
  { id: '1', lote: 'LOTE-2026-001', dataEnvio: '07/04/2026', qtdPagamentos: 45, valorTotal: 1250000, status: 'processado', banco: 'Banco do Brasil', tipoArquivo: 'CNAB 240' },
  { id: '2', lote: 'LOTE-2026-002', dataEnvio: '07/04/2026', qtdPagamentos: 32, valorTotal: 890000, status: 'processado', banco: 'Itaú Unibanco', tipoArquivo: 'CNAB 240' },
  { id: '3', lote: 'LOTE-2026-003', dataEnvio: '06/04/2026', qtdPagamentos: 28, valorTotal: 720000, status: 'aguardando', banco: 'Bradesco', tipoArquivo: 'CNAB 240' },
  { id: '4', lote: 'LOTE-2026-004', dataEnvio: '06/04/2026', qtdPagamentos: 51, valorTotal: 1580000, status: 'processado', banco: 'Santander', tipoArquivo: 'CNAB 240' },
  { id: '5', lote: 'LOTE-2026-005', dataEnvio: '05/04/2026', qtdPagamentos: 19, valorTotal: 430000, status: 'em_processamento', banco: 'Banco do Brasil', tipoArquivo: 'CNAB 240' },
  { id: '6', lote: 'LOTE-2026-006', dataEnvio: '05/04/2026', qtdPagamentos: 38, valorTotal: 1100000, status: 'processado', banco: 'Itaú Unibanco', tipoArquivo: 'CNAB 240' },
  { id: '7', lote: 'LOTE-2026-007', dataEnvio: '04/04/2026', qtdPagamentos: 15, valorTotal: 350000, status: 'erro', banco: 'Bradesco', tipoArquivo: 'CNAB 240' },
  { id: '8', lote: 'LOTE-2026-008', dataEnvio: '04/04/2026', qtdPagamentos: 42, valorTotal: 1350000, status: 'processado', banco: 'Santander', tipoArquivo: 'CNAB 240' },
  { id: '9', lote: 'LOTE-2026-009', dataEnvio: '03/04/2026', qtdPagamentos: 27, valorTotal: 680000, status: 'processado', banco: 'Banco do Brasil', tipoArquivo: 'CNAB 240' },
  { id: '10', lote: 'LOTE-2026-010', dataEnvio: '03/04/2026', qtdPagamentos: 36, valorTotal: 950000, status: 'processado', banco: 'Itaú Unibanco', tipoArquivo: 'CNAB 240' },
];

const statusConfig: Record<StatusLote, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  processado: { label: 'Processado', color: 'text-green-700', bg: 'bg-green-50 border-green-200', icon: <CheckCircle2 size={14} className="text-green-600" /> },
  aguardando: { label: 'Aguardando', color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200', icon: <Clock size={14} className="text-yellow-600" /> },
  em_processamento: { label: 'Em Processamento', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', icon: <Clock size={14} className="text-blue-600" /> },
  erro: { label: 'Erro', color: 'text-red-700', bg: 'bg-red-50 border-red-200', icon: <AlertTriangle size={14} className="text-red-600" /> },
};

const duplicataStatusConfig: Record<DuplicataRelacionada['status'], { label: string; color: string; bg: string }> = {
  liquidada: { label: 'Liquidada', color: 'text-green-700', bg: 'bg-green-50' },
  agendada: { label: 'Agendada', color: 'text-blue-700', bg: 'bg-blue-50' },
  pendente: { label: 'Pendente', color: 'text-amber-700', bg: 'bg-amber-50' },
};

function buildLoteDetails(lote: LoteCNAB) {
  const sacado = [
    'Industria Horizonte S.A.',
    'Comercial Atlas Ltda.',
    'Distribuidora Nova Era',
    'Metalurgica Delta'
  ][(Number(lote.id) - 1) % 4];

  const duplicatas: DuplicataRelacionada[] = Array.from({ length: Math.min(lote.qtdPagamentos, 8) }, (_, index) => ({
    id: `DUP-${lote.id}-${String(index + 1).padStart(3, '0')}`,
    vencimento: `${String(10 + index).padStart(2, '0')}/04/2026`,
    valor: Math.round((lote.valorTotal / lote.qtdPagamentos) * (0.85 + index * 0.03)),
    status: index % 3 === 0 ? 'liquidada' : index % 3 === 1 ? 'agendada' : 'pendente',
    notaFiscal: `NF-${lote.id}-${String(index + 1).padStart(3, '0')}`,
    fornecedor: [
      'Fornecedor Prisma',
      'Tecidos Aurora',
      'Logistica Prime',
      'Auto Pecas Central'
    ][index % 4],
    emissao: `${String(2 + index).padStart(2, '0')}/04/2026`,
    chaveAcesso: `${lote.id}${String(index + 1).padStart(4, '0')}351604123456780001995500100000000${index + 1}`,
  }));

  return { sacado, duplicatas };
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatCurrencyCompact(value: number): string {
  if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `R$ ${(value / 1000).toFixed(0)}K`;
  return `R$ ${value.toFixed(0)}`;
}

const PaymentReport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterBanco, setFilterBanco] = useState('');
  const loteId = location.pathname.split('/').filter(Boolean)[2];
  const selectedLote = loteId ? mockLotes.find((lote) => lote.id === loteId) : null;

  const filteredLotes = useMemo(() => {
    return mockLotes.filter((l) => {
      if (filterStatus && l.status !== filterStatus) return false;
      if (filterBanco && l.banco !== filterBanco) return false;
      return true;
    });
  }, [filterStatus, filterBanco]);

  const stats = useMemo(() => ({
    totalLotes: mockLotes.length,
    pagamentosProcessados: mockLotes.reduce((acc, l) => acc + l.qtdPagamentos, 0),
    volumeTotal: mockLotes.reduce((acc, l) => acc + l.valorTotal, 0),
    taxaSucesso: ((mockLotes.filter(l => l.status === 'processado').length / mockLotes.length) * 100).toFixed(1),
  }), []);

  const hasActiveFilters = filterStatus || filterBanco;
  const activeFilterCount = [filterStatus, filterBanco].filter(Boolean).length;

  const handleClear = () => {
    setFilterStatus('');
    setFilterBanco('');
  };

  if (selectedLote) {
    const st = statusConfig[selectedLote.status];
    const { sacado, duplicatas } = buildLoteDetails(selectedLote);

    return (
      <div className="p-4 md:p-6 min-h-full max-h-full overflow-y-auto overflow-x-hidden bg-gray-100">
        <div className="w-full max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <button
                onClick={() => navigate('/app/payment-report')}
                className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft size={16} />
                Voltar para lotes
              </button>
              <h1 className="text-lg md:text-2xl font-bold text-gray-900">{selectedLote.lote}</h1>
              <p className="text-sm text-gray-500 mt-1">
                {selectedLote.banco} • Enviado em {selectedLote.dataEnvio} • {selectedLote.tipoArquivo}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Sacado do lote: <span className="font-medium text-gray-900">{sacado}</span>
              </p>
            </div>
            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${st.bg} ${st.color}`}>
              {st.icon}
              {st.label}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Valor total</p>
              <p className="text-2xl font-bold text-gray-900">R$ {formatCurrency(selectedLote.valorTotal)}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Sacado</p>
              <p className="text-lg font-bold text-gray-900">{sacado}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Qtd. pagamentos</p>
              <p className="text-2xl font-bold text-gray-900">{selectedLote.qtdPagamentos}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Duplicatas listadas</p>
              <p className="text-2xl font-bold text-gray-900">{duplicatas.length}</p>
            </div>
          </div>

          <section className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Files size={18} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900">Duplicatas e notas fiscais relacionadas</h2>
                <p className="text-sm text-gray-500">Duplicatas do mesmo sacado incluídas no lote</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-gray-500">Duplicata</th>
                    <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-gray-500">Nota Fiscal</th>
                    <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-gray-500">Fornecedor</th>
                    <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-gray-500">Emissão NF</th>
                    <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-gray-500">Vencimento</th>
                    <th className="px-4 py-3 text-right text-[10px] uppercase tracking-wider text-gray-500">Valor</th>
                    <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-gray-500">Chave de acesso</th>
                    <th className="px-4 py-3 text-center text-[10px] uppercase tracking-wider text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {duplicatas.map((duplicata) => {
                    const duplicataStatus = duplicataStatusConfig[duplicata.status];
                    return (
                      <tr key={duplicata.id} className="border-b border-gray-100 last:border-b-0">
                        <td className="px-4 py-3 font-medium text-gray-900">{duplicata.id}</td>
                        <td className="px-4 py-3 text-gray-600">{duplicata.notaFiscal}</td>
                        <td className="px-4 py-3 text-gray-600">{duplicata.fornecedor}</td>
                        <td className="px-4 py-3 text-gray-600">{duplicata.emissao}</td>
                        <td className="px-4 py-3 text-gray-600">{duplicata.vencimento}</td>
                        <td className="px-4 py-3 text-right text-gray-900">R$ {formatCurrency(duplicata.valor)}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs">{duplicata.chaveAcesso}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${duplicataStatus.bg} ${duplicataStatus.color}`}>
                            {duplicataStatus.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    );
  }

  const kpis = [
    { label: 'Total de Lotes', value: stats.totalLotes.toString(), icon: Layers },
    { label: 'Pagamentos Processados', value: stats.pagamentosProcessados.toLocaleString('pt-BR'), icon: FileText },
    { label: 'Volume Total', value: formatCurrencyCompact(stats.volumeTotal), icon: DollarSign },
    { label: 'Taxa de Sucesso', value: `${stats.taxaSucesso}%`, icon: CheckCircle2 },
  ];

  return (
    <div className="p-4 md:p-6 min-h-full max-h-full overflow-y-auto overflow-x-hidden bg-gray-100">
      <div className="w-full">
        <div className="mb-4">
          <h1 className="text-lg md:text-2xl font-bold">Controle de Pagamentos</h1>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {kpis.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="bg-white border border-gray-200 rounded-xl shadow-sm px-5 py-6 flex items-center gap-4 transition-all duration-200 hover:shadow-md h-[88px]"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-100">
                <Icon className="w-5 h-5 text-gray-500" strokeWidth={1.8} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-medium leading-snug block break-words text-gray-500">
                  {label}
                </span>
                <div className="text-2xl font-bold leading-snug mt-1 text-gray-900">{value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-4 md:mb-6">
          <button
            className="flex items-center justify-between w-full px-5 py-3.5 hover:bg-gray-50/50 transition-colors rounded-xl"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <div className="flex items-center gap-3">
              <FunnelSimple className="w-5 h-5 text-gray-600" weight="regular" />
              <span className="text-sm font-semibold text-gray-800">Filtros</span>
              {activeFilterCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`}
              strokeWidth={1.5}
            />
          </button>

          {isFilterOpen && (
            <div className="px-5 pb-5 pt-2 border-t border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] items-end gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Status
                  </label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                  >
                    <option value="">Todos</option>
                    <option value="processado">Processado</option>
                    <option value="aguardando">Aguardando</option>
                    <option value="em_processamento">Em Processamento</option>
                    <option value="erro">Erro</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Banco
                  </label>
                  <select
                    value={filterBanco}
                    onChange={(e) => setFilterBanco(e.target.value)}
                    className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                  >
                    <option value="">Todos</option>
                    <option value="Banco do Brasil">Banco do Brasil</option>
                    <option value="Itaú Unibanco">Itaú Unibanco</option>
                    <option value="Bradesco">Bradesco</option>
                    <option value="Santander">Santander</option>
                  </select>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={handleClear}
                    className="h-10 px-4 flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    Limpar
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-3 py-2.5 font-medium text-left text-[10px] text-gray-500 uppercase tracking-wider">Lote</th>
                  <th className="px-3 py-2.5 font-medium text-left text-[10px] text-gray-500 uppercase tracking-wider">Data de Envio</th>
                  <th className="px-3 py-2.5 font-medium text-left text-[10px] text-gray-500 uppercase tracking-wider">Banco</th>
                  <th className="px-3 py-2.5 font-medium text-right text-[10px] text-gray-500 uppercase tracking-wider">Qtd. Pagamentos</th>
                  <th className="px-3 py-2.5 font-medium text-right text-[10px] text-gray-500 uppercase tracking-wider">Valor Total</th>
                  <th className="px-3 py-2.5 font-medium text-center text-[10px] text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-3 py-2.5 font-medium text-center text-[10px] text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredLotes.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16">
                      <div className="flex flex-col items-center justify-center text-center">
                        <FileText className="w-12 h-12 text-gray-300 mb-3" strokeWidth={1.5} />
                        <p className="text-sm font-medium text-gray-500">Nenhum lote encontrado</p>
                        <p className="text-xs text-gray-400 mt-1">Tente ajustar os filtros para ver mais resultados</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLotes.map((lote) => {
                    const st = statusConfig[lote.status];
                    return (
                      <tr
                        key={lote.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => navigate(`/app/payment-report/${lote.id}`)}
                      >
                        <td className="px-3 py-2.5 font-medium text-blue-700">{lote.lote}</td>
                        <td className="px-3 py-2.5 text-gray-600">{lote.dataEnvio}</td>
                        <td className="px-3 py-2.5 text-gray-600">{lote.banco}</td>
                        <td className="px-3 py-2.5 text-right text-gray-900">{lote.qtdPagamentos}</td>
                        <td className="px-3 py-2.5 text-right text-gray-900 font-medium">R$ {formatCurrency(lote.valorTotal)}</td>
                        <td className="px-3 py-2.5">
                          <div className="flex justify-center">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${st.bg} ${st.color}`}>
                              {st.icon}
                              {st.label}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="flex justify-center gap-1">
                            <button
                              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                              title="Visualizar"
                              onClick={(event) => {
                                event.stopPropagation();
                                navigate(`/app/payment-report/${lote.id}`);
                              }}
                            >
                              <Eye size={16} />
                            </button>
                            <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors" title="Download">
                              <Download size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-xs text-gray-500">
              {filteredLotes.length > 0
                ? `1-${filteredLotes.length} de ${filteredLotes.length}`
                : '0 resultados'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReport;
