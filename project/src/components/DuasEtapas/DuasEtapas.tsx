import React, { useState } from 'react';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Eye
} from 'lucide-react';

type StatusEtapa1 = 'confirmado' | 'pendente' | 'atrasado';
type StatusEtapa2 = 'repassado' | 'aguardando' | 'em_processamento' | 'falha';

interface PagamentoDuasEtapas {
  id: string;
  duplicata: string;
  sacado: string;
  cnpjSacado: string;
  novoRecebedor: string;
  cnpjRecebedor: string;
  valorOriginal: number;
  valorRepasse: number;
  taxaIntermediacao: number;
  dataVencimento: string;
  dataPagamentoB3: string | null;
  dataRepasseRecebedor: string | null;
  statusEtapa1: StatusEtapa1;
  statusEtapa2: StatusEtapa2;
  bancoOrigem: string;
  bancoDestino: string;
}

const mockPagamentos: PagamentoDuasEtapas[] = [
  {
    id: 'PG-001',
    duplicata: 'DUP-2026-04521',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Distribuidora Nacional Ltda',
    cnpjRecebedor: '98.765.432/0001-10',
    valorOriginal: 125000.00,
    valorRepasse: 124375.00,
    taxaIntermediacao: 625.00,
    dataVencimento: '10/04/2026',
    dataPagamentoB3: '08/04/2026',
    dataRepasseRecebedor: '08/04/2026',
    statusEtapa1: 'confirmado',
    statusEtapa2: 'repassado',
    bancoOrigem: 'Banco do Brasil',
    bancoDestino: 'Itaú Unibanco',
  },
  {
    id: 'PG-002',
    duplicata: 'DUP-2026-04533',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Logística Express Corp',
    cnpjRecebedor: '87.654.321/0001-20',
    valorOriginal: 89500.00,
    valorRepasse: 89052.50,
    taxaIntermediacao: 447.50,
    dataVencimento: '12/04/2026',
    dataPagamentoB3: '07/04/2026',
    dataRepasseRecebedor: null,
    statusEtapa1: 'confirmado',
    statusEtapa2: 'em_processamento',
    bancoOrigem: 'Bradesco',
    bancoDestino: 'Santander',
  },
  {
    id: 'PG-003',
    duplicata: 'DUP-2026-04540',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Metalúrgica São Paulo S.A.',
    cnpjRecebedor: '76.543.210/0001-30',
    valorOriginal: 67800.00,
    valorRepasse: 67461.00,
    taxaIntermediacao: 339.00,
    dataVencimento: '15/04/2026',
    dataPagamentoB3: null,
    dataRepasseRecebedor: null,
    statusEtapa1: 'pendente',
    statusEtapa2: 'aguardando',
    bancoOrigem: 'Caixa Econômica',
    bancoDestino: 'Banco do Brasil',
  },
  {
    id: 'PG-004',
    duplicata: 'DUP-2026-04412',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Fornecedora Central S.A.',
    cnpjRecebedor: '65.432.109/0001-40',
    valorOriginal: 234000.00,
    valorRepasse: 232830.00,
    taxaIntermediacao: 1170.00,
    dataVencimento: '05/04/2026',
    dataPagamentoB3: '05/04/2026',
    dataRepasseRecebedor: '06/04/2026',
    statusEtapa1: 'confirmado',
    statusEtapa2: 'repassado',
    bancoOrigem: 'Itaú Unibanco',
    bancoDestino: 'Bradesco',
  },
  {
    id: 'PG-005',
    duplicata: 'DUP-2026-04389',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Materiais & Cia Ltda',
    cnpjRecebedor: '54.321.098/0001-50',
    valorOriginal: 178500.00,
    valorRepasse: 177607.50,
    taxaIntermediacao: 892.50,
    dataVencimento: '03/04/2026',
    dataPagamentoB3: '03/04/2026',
    dataRepasseRecebedor: null,
    statusEtapa1: 'confirmado',
    statusEtapa2: 'falha',
    bancoOrigem: 'Santander',
    bancoDestino: 'Banco do Brasil',
  },
  {
    id: 'PG-006',
    duplicata: 'DUP-2026-04560',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Agro Insumos S.A.',
    cnpjRecebedor: '43.210.987/0001-60',
    valorOriginal: 56200.00,
    valorRepasse: 55919.00,
    taxaIntermediacao: 281.00,
    dataVencimento: '18/04/2026',
    dataPagamentoB3: null,
    dataRepasseRecebedor: null,
    statusEtapa1: 'pendente',
    statusEtapa2: 'aguardando',
    bancoOrigem: 'Banco do Brasil',
    bancoDestino: 'Caixa Econômica',
  },
  {
    id: 'PG-007',
    duplicata: 'DUP-2026-04298',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Componentes Eletrônicos Ltda',
    cnpjRecebedor: '32.109.876/0001-70',
    valorOriginal: 42300.00,
    valorRepasse: 42088.50,
    taxaIntermediacao: 211.50,
    dataVencimento: '01/04/2026',
    dataPagamentoB3: null,
    dataRepasseRecebedor: null,
    statusEtapa1: 'atrasado',
    statusEtapa2: 'aguardando',
    bancoOrigem: 'Bradesco',
    bancoDestino: 'Itaú Unibanco',
  },
  {
    id: 'PG-008',
    duplicata: 'DUP-2026-04580',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Têxtil Nordeste S.A.',
    cnpjRecebedor: '21.098.765/0001-80',
    valorOriginal: 93200.00,
    valorRepasse: 92734.00,
    taxaIntermediacao: 466.00,
    dataVencimento: '20/04/2026',
    dataPagamentoB3: null,
    dataRepasseRecebedor: null,
    statusEtapa1: 'pendente',
    statusEtapa2: 'aguardando',
    bancoOrigem: 'Banco do Brasil',
    bancoDestino: 'Bradesco',
  },
  {
    id: 'PG-009',
    duplicata: 'DUP-2026-04312',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Construtora Horizonte Ltda',
    cnpjRecebedor: '10.987.654/0001-90',
    valorOriginal: 310000.00,
    valorRepasse: 308450.00,
    taxaIntermediacao: 1550.00,
    dataVencimento: '02/04/2026',
    dataPagamentoB3: '02/04/2026',
    dataRepasseRecebedor: '02/04/2026',
    statusEtapa1: 'confirmado',
    statusEtapa2: 'repassado',
    bancoOrigem: 'Itaú Unibanco',
    bancoDestino: 'Caixa Econômica',
  },
  {
    id: 'PG-010',
    duplicata: 'DUP-2026-04601',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Pharma Distribuidora S.A.',
    cnpjRecebedor: '09.876.543/0001-01',
    valorOriginal: 47600.00,
    valorRepasse: 47362.00,
    taxaIntermediacao: 238.00,
    dataVencimento: '22/04/2026',
    dataPagamentoB3: null,
    dataRepasseRecebedor: null,
    statusEtapa1: 'pendente',
    statusEtapa2: 'aguardando',
    bancoOrigem: 'Santander',
    bancoDestino: 'Banco do Brasil',
  },
  {
    id: 'PG-011',
    duplicata: 'DUP-2026-04455',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Siderúrgica Vale do Aço S.A.',
    cnpjRecebedor: '88.776.655/0001-11',
    valorOriginal: 520000.00,
    valorRepasse: 517400.00,
    taxaIntermediacao: 2600.00,
    dataVencimento: '08/04/2026',
    dataPagamentoB3: '07/04/2026',
    dataRepasseRecebedor: '07/04/2026',
    statusEtapa1: 'confirmado',
    statusEtapa2: 'repassado',
    bancoOrigem: 'Bradesco',
    bancoDestino: 'Itaú Unibanco',
  },
  {
    id: 'PG-012',
    duplicata: 'DUP-2026-04620',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Alimentos do Sul Ltda',
    cnpjRecebedor: '77.665.544/0001-22',
    valorOriginal: 28900.00,
    valorRepasse: 28755.50,
    taxaIntermediacao: 144.50,
    dataVencimento: '25/04/2026',
    dataPagamentoB3: null,
    dataRepasseRecebedor: null,
    statusEtapa1: 'pendente',
    statusEtapa2: 'aguardando',
    bancoOrigem: 'Caixa Econômica',
    bancoDestino: 'Santander',
  },
  {
    id: 'PG-013',
    duplicata: 'DUP-2026-04350',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Petroquímica Brasil S.A.',
    cnpjRecebedor: '66.554.433/0001-33',
    valorOriginal: 189000.00,
    valorRepasse: 188055.00,
    taxaIntermediacao: 945.00,
    dataVencimento: '04/04/2026',
    dataPagamentoB3: '04/04/2026',
    dataRepasseRecebedor: null,
    statusEtapa1: 'confirmado',
    statusEtapa2: 'em_processamento',
    bancoOrigem: 'Banco do Brasil',
    bancoDestino: 'Bradesco',
  },
  {
    id: 'PG-014',
    duplicata: 'DUP-2026-04640',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Embalagens Premium Ltda',
    cnpjRecebedor: '55.443.322/0001-44',
    valorOriginal: 15400.00,
    valorRepasse: 15323.00,
    taxaIntermediacao: 77.00,
    dataVencimento: '28/04/2026',
    dataPagamentoB3: null,
    dataRepasseRecebedor: null,
    statusEtapa1: 'pendente',
    statusEtapa2: 'aguardando',
    bancoOrigem: 'Itaú Unibanco',
    bancoDestino: 'Caixa Econômica',
  },
  {
    id: 'PG-015',
    duplicata: 'DUP-2026-04370',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Transportadora Rápido Sul',
    cnpjRecebedor: '44.332.211/0001-55',
    valorOriginal: 72500.00,
    valorRepasse: 72137.50,
    taxaIntermediacao: 362.50,
    dataVencimento: '06/04/2026',
    dataPagamentoB3: '06/04/2026',
    dataRepasseRecebedor: '06/04/2026',
    statusEtapa1: 'confirmado',
    statusEtapa2: 'repassado',
    bancoOrigem: 'Santander',
    bancoDestino: 'Banco do Brasil',
  },
  {
    id: 'PG-016',
    duplicata: 'DUP-2026-04280',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Energia Solar Nordeste S.A.',
    cnpjRecebedor: '33.221.110/0001-66',
    valorOriginal: 145000.00,
    valorRepasse: 144275.00,
    taxaIntermediacao: 725.00,
    dataVencimento: '30/03/2026',
    dataPagamentoB3: null,
    dataRepasseRecebedor: null,
    statusEtapa1: 'atrasado',
    statusEtapa2: 'aguardando',
    bancoOrigem: 'Bradesco',
    bancoDestino: 'Santander',
  },
  {
    id: 'PG-017',
    duplicata: 'DUP-2026-04500',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Celulose Amazônia S.A.',
    cnpjRecebedor: '22.110.998/0001-77',
    valorOriginal: 267000.00,
    valorRepasse: 265665.00,
    taxaIntermediacao: 1335.00,
    dataVencimento: '09/04/2026',
    dataPagamentoB3: '07/04/2026',
    dataRepasseRecebedor: null,
    statusEtapa1: 'confirmado',
    statusEtapa2: 'em_processamento',
    bancoOrigem: 'Caixa Econômica',
    bancoDestino: 'Itaú Unibanco',
  },
  {
    id: 'PG-018',
    duplicata: 'DUP-2026-04660',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Mineração Centro-Oeste Ltda',
    cnpjRecebedor: '11.009.887/0001-88',
    valorOriginal: 385000.00,
    valorRepasse: 383075.00,
    taxaIntermediacao: 1925.00,
    dataVencimento: '30/04/2026',
    dataPagamentoB3: null,
    dataRepasseRecebedor: null,
    statusEtapa1: 'pendente',
    statusEtapa2: 'aguardando',
    bancoOrigem: 'Banco do Brasil',
    bancoDestino: 'Bradesco',
  },
  {
    id: 'PG-019',
    duplicata: 'DUP-2026-04395',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Química Fina Industrial S.A.',
    cnpjRecebedor: '99.887.776/0001-99',
    valorOriginal: 58700.00,
    valorRepasse: 58406.50,
    taxaIntermediacao: 293.50,
    dataVencimento: '07/04/2026',
    dataPagamentoB3: '07/04/2026',
    dataRepasseRecebedor: '07/04/2026',
    statusEtapa1: 'confirmado',
    statusEtapa2: 'repassado',
    bancoOrigem: 'Itaú Unibanco',
    bancoDestino: 'Santander',
  },
  {
    id: 'PG-020',
    duplicata: 'DUP-2026-04330',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Auto Peças Nacional Ltda',
    cnpjRecebedor: '88.776.665/0001-02',
    valorOriginal: 34200.00,
    valorRepasse: 34029.00,
    taxaIntermediacao: 171.00,
    dataVencimento: '03/04/2026',
    dataPagamentoB3: '03/04/2026',
    dataRepasseRecebedor: null,
    statusEtapa1: 'confirmado',
    statusEtapa2: 'falha',
    bancoOrigem: 'Santander',
    bancoDestino: 'Caixa Econômica',
  },
  {
    id: 'PG-021',
    duplicata: 'DUP-2026-04680',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Gráfica Impressa Ltda',
    cnpjRecebedor: '77.665.554/0001-13',
    valorOriginal: 11800.00,
    valorRepasse: 11741.00,
    taxaIntermediacao: 59.00,
    dataVencimento: '02/05/2026',
    dataPagamentoB3: null,
    dataRepasseRecebedor: null,
    statusEtapa1: 'pendente',
    statusEtapa2: 'aguardando',
    bancoOrigem: 'Bradesco',
    bancoDestino: 'Banco do Brasil',
  },
  {
    id: 'PG-022',
    duplicata: 'DUP-2026-04260',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Laticínios Serra Gaúcha S.A.',
    cnpjRecebedor: '66.554.443/0001-24',
    valorOriginal: 97500.00,
    valorRepasse: 97012.50,
    taxaIntermediacao: 487.50,
    dataVencimento: '28/03/2026',
    dataPagamentoB3: null,
    dataRepasseRecebedor: null,
    statusEtapa1: 'atrasado',
    statusEtapa2: 'aguardando',
    bancoOrigem: 'Caixa Econômica',
    bancoDestino: 'Bradesco',
  },
  {
    id: 'PG-023',
    duplicata: 'DUP-2026-04470',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'TechParts Componentes S.A.',
    cnpjRecebedor: '55.443.332/0001-35',
    valorOriginal: 163000.00,
    valorRepasse: 162185.00,
    taxaIntermediacao: 815.00,
    dataVencimento: '11/04/2026',
    dataPagamentoB3: '07/04/2026',
    dataRepasseRecebedor: null,
    statusEtapa1: 'confirmado',
    statusEtapa2: 'em_processamento',
    bancoOrigem: 'Banco do Brasil',
    bancoDestino: 'Itaú Unibanco',
  },
  {
    id: 'PG-024',
    duplicata: 'DUP-2026-04700',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Frigorífico Pantanal Ltda',
    cnpjRecebedor: '44.332.221/0001-46',
    valorOriginal: 205000.00,
    valorRepasse: 203975.00,
    taxaIntermediacao: 1025.00,
    dataVencimento: '05/05/2026',
    dataPagamentoB3: null,
    dataRepasseRecebedor: null,
    statusEtapa1: 'pendente',
    statusEtapa2: 'aguardando',
    bancoOrigem: 'Itaú Unibanco',
    bancoDestino: 'Santander',
  },
  {
    id: 'PG-025',
    duplicata: 'DUP-2026-04420',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Plásticos Recicla Verde S.A.',
    cnpjRecebedor: '33.221.110/0001-57',
    valorOriginal: 41500.00,
    valorRepasse: 41292.50,
    taxaIntermediacao: 207.50,
    dataVencimento: '07/04/2026',
    dataPagamentoB3: '06/04/2026',
    dataRepasseRecebedor: '07/04/2026',
    statusEtapa1: 'confirmado',
    statusEtapa2: 'repassado',
    bancoOrigem: 'Bradesco',
    bancoDestino: 'Caixa Econômica',
  },
  {
    id: 'PG-026',
    duplicata: 'DUP-2026-04510',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Cerâmica Minas Gerais Ltda',
    cnpjRecebedor: '22.110.009/0001-68',
    valorOriginal: 76800.00,
    valorRepasse: 76416.00,
    taxaIntermediacao: 384.00,
    dataVencimento: '14/04/2026',
    dataPagamentoB3: '07/04/2026',
    dataRepasseRecebedor: null,
    statusEtapa1: 'confirmado',
    statusEtapa2: 'em_processamento',
    bancoOrigem: 'Santander',
    bancoDestino: 'Banco do Brasil',
  },
  {
    id: 'PG-027',
    duplicata: 'DUP-2026-04245',
    sacado: 'Sacado S.A.',
    cnpjSacado: '12.345.678/0001-90',
    novoRecebedor: 'Papel e Celulose Norte S.A.',
    cnpjRecebedor: '11.009.998/0001-79',
    valorOriginal: 132000.00,
    valorRepasse: 131340.00,
    taxaIntermediacao: 660.00,
    dataVencimento: '26/03/2026',
    dataPagamentoB3: null,
    dataRepasseRecebedor: null,
    statusEtapa1: 'atrasado',
    statusEtapa2: 'aguardando',
    bancoOrigem: 'Banco do Brasil',
    bancoDestino: 'Bradesco',
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const StatusBadgeEtapa1: React.FC<{ status: StatusEtapa1 }> = ({ status }) => {
  const config = {
    confirmado: { label: 'Confirmado', bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', icon: <CheckCircle2 size={12} /> },
    pendente: { label: 'Pendente', bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200', icon: <Clock size={12} /> },
    atrasado: { label: 'Atrasado', bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', icon: <AlertTriangle size={12} /> },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${c.bg} ${c.text} ${c.border}`}>
      {c.icon} {c.label}
    </span>
  );
};

const StatusBadgeEtapa2: React.FC<{ status: StatusEtapa2 }> = ({ status }) => {
  const config = {
    repassado: { label: 'Repassado', bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', icon: <CheckCircle2 size={12} /> },
    aguardando: { label: 'Aguardando', bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200', icon: <Clock size={12} /> },
    em_processamento: { label: 'Em Processamento', bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', icon: <Clock size={12} /> },
    falha: { label: 'Falha no Repasse', bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', icon: <AlertTriangle size={12} /> },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${c.bg} ${c.text} ${c.border}`}>
      {c.icon} {c.label}
    </span>
  );
};

type SortField = 'duplicata' | 'valorOriginal' | 'dataVencimento' | 'sacado';
type SortOrder = 'asc' | 'desc';

const DuasEtapas: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroEtapa1, setFiltroEtapa1] = useState<StatusEtapa1 | 'todos'>('todos');
  const [filtroEtapa2, setFiltroEtapa2] = useState<StatusEtapa2 | 'todos'>('todos');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('dataVencimento');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const filteredPagamentos = mockPagamentos
    .filter(p => {
      const matchSearch = searchTerm === '' ||
        p.sacado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.novoRecebedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.duplicata.toLowerCase().includes(searchTerm.toLowerCase());
      const matchEtapa1 = filtroEtapa1 === 'todos' || p.statusEtapa1 === filtroEtapa1;
      const matchEtapa2 = filtroEtapa2 === 'todos' || p.statusEtapa2 === filtroEtapa2;
      return matchSearch && matchEtapa1 && matchEtapa2;
    })
    .sort((a, b) => {
      const mult = sortOrder === 'asc' ? 1 : -1;
      if (sortField === 'valorOriginal') return (a.valorOriginal - b.valorOriginal) * mult;
      return String(a[sortField]).localeCompare(String(b[sortField])) * mult;
    });

  const totais = {
    totalPagamentos: mockPagamentos.length,
    totalRecebidoB3: mockPagamentos.filter(p => p.statusEtapa1 === 'confirmado').reduce((s, p) => s + p.valorOriginal, 0),
    totalRepassado: mockPagamentos.filter(p => p.statusEtapa2 === 'repassado').reduce((s, p) => s + p.valorRepasse, 0),
    totalPendente: mockPagamentos.filter(p => p.statusEtapa2 !== 'repassado').reduce((s, p) => s + p.valorOriginal, 0),
    taxasArrecadadas: mockPagamentos.filter(p => p.statusEtapa2 === 'repassado').reduce((s, p) => s + p.taxaIntermediacao, 0),
    comFalha: mockPagamentos.filter(p => p.statusEtapa2 === 'falha').length,
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const SortIcon: React.FC<{ field: SortField }> = ({ field }) => {
    if (sortField !== field) return <ChevronDown size={12} className="text-gray-300" />;
    return sortOrder === 'asc'
      ? <ChevronUp size={12} className="text-blue-600" />
      : <ChevronDown size={12} className="text-blue-600" />;
  };

  return (
    <div className="p-8 min-h-full max-h-full overflow-y-auto">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-2xl font-bold">Pagamentos em Duas Etapas</h1>
        <p className="text-gray-500 mt-1">Acompanhamento do fluxo de pagamento: Sacado → B3 (Agente de Coordenação) → Novo Recebedor</p>
      </div>

      {/* Fluxo Visual */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-green-50 rounded-xl border border-gray-200 p-5 mb-6">
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-3 bg-white rounded-lg border border-blue-200 shadow-sm px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Building2 size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">ETAPA 1</p>
              <p className="text-sm font-semibold text-gray-900">Sacado paga B3</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <div className="w-12 h-0.5 bg-blue-300"></div>
            <ArrowRight size={18} className="text-blue-400" />
          </div>

          <div className="flex items-center gap-3 bg-white rounded-lg border border-amber-200 shadow-sm px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <FileText size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">COORDENAÇÃO</p>
              <p className="text-sm font-semibold text-gray-900">B3 processa</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <div className="w-12 h-0.5 bg-green-300"></div>
            <ArrowRight size={18} className="text-green-400" />
          </div>

          <div className="flex items-center gap-3 bg-white rounded-lg border border-green-200 shadow-sm px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <DollarSign size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">ETAPA 2</p>
              <p className="text-sm font-semibold text-gray-900">B3 repassa ao Recebedor</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-500 uppercase">Total de Operações</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totais.totalPagamentos}</p>
          <p className="text-xs text-gray-500 mt-1">duplicatas processadas</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-500 uppercase">Recebido pela B3</p>
          <p className="text-2xl font-bold text-blue-700 mt-1">{formatCurrency(totais.totalRecebidoB3)}</p>
          <p className="text-xs text-gray-500 mt-1">etapa 1 confirmada</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-500 uppercase">Repassado</p>
          <p className="text-2xl font-bold text-green-700 mt-1">{formatCurrency(totais.totalRepassado)}</p>
          <p className="text-xs text-gray-500 mt-1">ao novo recebedor</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-500 uppercase">Pendente</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{formatCurrency(totais.totalPendente)}</p>
          <p className="text-xs text-gray-500 mt-1">aguardando repasse</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-500 uppercase">Falhas</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{totais.comFalha}</p>
          <p className="text-xs text-red-500 mt-1">{totais.comFalha > 0 ? 'requer atenção' : 'nenhuma falha'}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-4 p-3 border-b border-gray-200 mb-6">
        <div className="flex items-center gap-2 flex-1">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por sacado, recebedor ou duplicata..."
            className="bg-transparent text-sm outline-none flex-1 placeholder-gray-400"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-gray-500" />
          <select
            className="text-xs border border-gray-300 rounded px-2 py-1.5 bg-white"
            value={filtroEtapa1}
            onChange={e => setFiltroEtapa1(e.target.value as any)}
          >
            <option value="todos">Etapa 1: Todos</option>
            <option value="confirmado">Confirmado</option>
            <option value="pendente">Pendente</option>
            <option value="atrasado">Atrasado</option>
          </select>
          <select
            className="text-xs border border-gray-300 rounded px-2 py-1.5 bg-white"
            value={filtroEtapa2}
            onChange={e => setFiltroEtapa2(e.target.value as any)}
          >
            <option value="todos">Etapa 2: Todos</option>
            <option value="repassado">Repassado</option>
            <option value="em_processamento">Em Processamento</option>
            <option value="aguardando">Aguardando</option>
            <option value="falha">Falha</option>
          </select>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:text-blue-600" onClick={() => handleSort('duplicata')}>
                <span className="flex items-center gap-1">Duplicata <SortIcon field="duplicata" /></span>
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:text-blue-600" onClick={() => handleSort('sacado')}>
                <span className="flex items-center gap-1">Sacado <SortIcon field="sacado" /></span>
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Novo Recebedor</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:text-blue-600" onClick={() => handleSort('valorOriginal')}>
                <span className="flex items-center justify-end gap-1">Valor <SortIcon field="valorOriginal" /></span>
              </th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Etapa 1</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Etapa 2</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:text-blue-600" onClick={() => handleSort('dataVencimento')}>
                <span className="flex items-center justify-center gap-1">Vencimento <SortIcon field="dataVencimento" /></span>
              </th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Detalhe</th>
            </tr>
          </thead>
          <tbody>
            {filteredPagamentos.map((pag) => (
              <React.Fragment key={pag.id}>
                <tr
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${expandedRow === pag.id ? 'bg-blue-50/50' : ''}`}
                >
                  <td className="px-4 py-3 font-medium text-gray-900">{pag.duplicata}</td>
                  <td className="px-4 py-3 text-gray-700">
                    <div className="font-medium">{pag.sacado}</div>
                    <div className="text-xs text-gray-400">{pag.cnpjSacado}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <div>{pag.novoRecebedor}</div>
                    <div className="text-xs text-gray-400">{pag.cnpjRecebedor}</div>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-900">{formatCurrency(pag.valorOriginal)}</td>
                  <td className="px-4 py-3 text-center"><StatusBadgeEtapa1 status={pag.statusEtapa1} /></td>
                  <td className="px-4 py-3 text-center"><StatusBadgeEtapa2 status={pag.statusEtapa2} /></td>
                  <td className="px-4 py-3 text-center text-gray-600">{pag.dataVencimento}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setExpandedRow(expandedRow === pag.id ? null : pag.id)}
                      className="p-1.5 rounded-md hover:bg-blue-100 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Ver detalhes"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>

                {/* Detalhe Expandido */}
                {expandedRow === pag.id && (
                  <tr className="bg-blue-50/30">
                    <td colSpan={8} className="px-6 py-4">
                      <div className="grid grid-cols-3 gap-6">
                        {/* Etapa 1 */}
                        <div className="bg-white rounded-lg border border-blue-200 p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">1</div>
                            <h4 className="text-sm font-semibold text-gray-900">Pagamento do Sacado → B3</h4>
                          </div>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Sacado:</span>
                              <span className="font-medium text-gray-800">{pag.sacado}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Valor pago:</span>
                              <span className="font-medium text-gray-800">{formatCurrency(pag.valorOriginal)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Data pagamento:</span>
                              <span className="font-medium text-gray-800">{pag.dataPagamentoB3 ?? '—'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Banco origem:</span>
                              <span className="font-medium text-gray-800">{pag.bancoOrigem}</span>
                            </div>
                            <div className="flex justify-between items-center pt-1">
                              <span className="text-gray-500">Status:</span>
                              <StatusBadgeEtapa1 status={pag.statusEtapa1} />
                            </div>
                          </div>
                        </div>

                        {/* Intermediação B3 */}
                        <div className="bg-white rounded-lg border border-amber-200 p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                              <FileText size={12} className="text-amber-700" />
                            </div>
                            <h4 className="text-sm font-semibold text-gray-900">Coordenação B3</h4>
                          </div>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Valor recebido:</span>
                              <span className="font-medium text-gray-800">{formatCurrency(pag.valorOriginal)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Taxa intermediação:</span>
                              <span className="font-medium text-amber-700">{formatCurrency(pag.taxaIntermediacao)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Valor líquido repasse:</span>
                              <span className="font-medium text-green-700">{formatCurrency(pag.valorRepasse)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">% Taxa:</span>
                              <span className="font-medium text-gray-800">{((pag.taxaIntermediacao / pag.valorOriginal) * 100).toFixed(2)}%</span>
                            </div>
                          </div>
                        </div>

                        {/* Etapa 2 */}
                        <div className="bg-white rounded-lg border border-green-200 p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-xs font-bold text-green-700">2</div>
                            <h4 className="text-sm font-semibold text-gray-900">Repasse B3 → Novo Recebedor</h4>
                          </div>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Recebedor:</span>
                              <span className="font-medium text-gray-800">{pag.novoRecebedor}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Valor repasse:</span>
                              <span className="font-medium text-gray-800">{formatCurrency(pag.valorRepasse)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Data repasse:</span>
                              <span className="font-medium text-gray-800">{pag.dataRepasseRecebedor ?? '—'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Banco destino:</span>
                              <span className="font-medium text-gray-800">{pag.bancoDestino}</span>
                            </div>
                            <div className="flex justify-between items-center pt-1">
                              <span className="text-gray-500">Status:</span>
                              <StatusBadgeEtapa2 status={pag.statusEtapa2} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {filteredPagamentos.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FileText size={40} className="mx-auto mb-3 text-gray-300" />
            <p className="text-sm">Nenhum pagamento encontrado com os filtros aplicados.</p>
          </div>
        )}
      </div>

      {/* Rodapé */}
      <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
        <span>Exibindo {filteredPagamentos.length} de {mockPagamentos.length} operações</span>
        <span>Última atualização: 07/04/2026 às 14:32</span>
      </div>
    </div>
  );
};

export default DuasEtapas;
