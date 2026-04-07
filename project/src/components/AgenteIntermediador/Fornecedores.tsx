import React, { useState, useMemo } from 'react';
import {
  Users,
  Building2,
  TrendingUp,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  FileText,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import { DuplicatasTable } from '../../modules/duplicatas/components/DuplicatasTable';
import { Duplicata } from '../../modules/duplicatas/types/duplicata';

interface Fornecedor {
  id: number;
  name: string;
  cnpj: string;
  city: string;
  duplicates: number;
  value: number;
  status: string;
  contact: string;
  phone: string;
  lastActivity: string;
}

const mockFornecedores: Fornecedor[] = [
  { id: 1, name: 'Fornecedor Alpha Ltda', cnpj: '12.345.678/0001-90', city: 'São Paulo - SP', duplicates: 2340, value: 8500000, status: 'ativo', contact: 'contato@alpha.com.br', phone: '(11) 9999-1234', lastActivity: '2026-04-05' },
  { id: 2, name: 'Beta Indústria S.A.', cnpj: '23.456.789/0001-01', city: 'Campinas - SP', duplicates: 1890, value: 6750000, status: 'ativo', contact: 'financeiro@beta.com.br', phone: '(19) 9888-5678', lastActivity: '2026-04-06' },
  { id: 3, name: 'Gamma Comércio Ltda', cnpj: '34.567.890/0001-12', city: 'Rio de Janeiro - RJ', duplicates: 1650, value: 5200000, status: 'ativo', contact: 'admin@gamma.com.br', phone: '(21) 9777-9012', lastActivity: '2026-04-04' },
  { id: 4, name: 'Delta Serviços S.A.', cnpj: '45.678.901/0001-23', city: 'Belo Horizonte - MG', duplicates: 1420, value: 4800000, status: 'ativo', contact: 'delta@delta.com.br', phone: '(31) 9666-3456', lastActivity: '2026-04-03' },
  { id: 5, name: 'Epsilon Tech Ltda', cnpj: '56.789.012/0001-34', city: 'Curitiba - PR', duplicates: 1280, value: 4200000, status: 'ativo', contact: 'tech@epsilon.com.br', phone: '(41) 9555-7890', lastActivity: '2026-04-06' },
  { id: 6, name: 'Zeta Logística S.A.', cnpj: '67.890.123/0001-45', city: 'Porto Alegre - RS', duplicates: 980, value: 3100000, status: 'inativo', contact: 'log@zeta.com.br', phone: '(51) 9444-2345', lastActivity: '2026-03-20' },
  { id: 7, name: 'Eta Distribuidora Ltda', cnpj: '78.901.234/0001-56', city: 'Salvador - BA', duplicates: 870, value: 2800000, status: 'ativo', contact: 'dist@eta.com.br', phone: '(71) 9333-6789', lastActivity: '2026-04-01' },
  { id: 8, name: 'Theta Materiais S.A.', cnpj: '89.012.345/0001-67', city: 'Recife - PE', duplicates: 750, value: 2400000, status: 'ativo', contact: 'mat@theta.com.br', phone: '(81) 9222-0123', lastActivity: '2026-04-02' },
];

const sacados = [
  { name: 'Construtora Horizonte S.A.', cnpj: '10.111.222/0001-10' },
  { name: 'Rede Varejista Brasil Ltda', cnpj: '20.222.333/0001-20' },
  { name: 'Indústria Alimentos MG S.A.', cnpj: '30.333.444/0001-30' },
  { name: 'Metalúrgica Paulista Ltda', cnpj: '40.444.555/0001-40' },
  { name: 'Grupo Logístico Norte S.A.', cnpj: '50.555.666/0001-50' },
];

const bancos = [
  '001 - Banco do Brasil SA',
  '033 - Banco Santander SA',
  '104 - Caixa Econômica Federal',
  '237 - Banco Bradesco SA',
  '341 - Banco Itaú SA',
];

function generateDuplicatasForFornecedor(fornecedor: Fornecedor): Duplicata[] {
  const count = 5 + (fornecedor.id % 4);
  const duplicatas: Duplicata[] = [];

  for (let i = 1; i <= count; i++) {
    const sacado = sacados[(fornecedor.id + i) % sacados.length];
    const banco = bancos[(fornecedor.id + i) % bancos.length];
    const mes = String(((i - 1) % 12) + 1).padStart(2, '0');
    const valor = Math.round((fornecedor.value / count) * (0.7 + Math.random() * 0.6));

    duplicatas.push({
      id: `DUP-F${fornecedor.id}-${String(i).padStart(3, '0')}`,
      numeroDuplicata: `${String(i).padStart(3, '0')}/FAT-${60000 + fornecedor.id * 100 + i}`,
      sacador: { name: fornecedor.name, cnpj: fornecedor.cnpj },
      sacado: { name: sacado.name, cnpj: sacado.cnpj },
      dataEmissao: `${mes}/01/2026`,
      dataVencimento: `${mes}/03/2026`,
      valor,
      statusNegociacao: i % 3 === 0 ? 'nao_negociada' : 'negociada',
      banco,
      numeroNota: String(1000 + fornecedor.id * 10 + i).padStart(6, '0'),
      serie: '001',
      chaveNFe: `${String(fornecedor.id).repeat(5)}${String(i).repeat(5)}09384379093800039739174803817`.slice(0, 44),
    });
  }

  return duplicatas;
}

const summaryData = {
  totalSuppliers: 1250,
  activeSuppliers: 1180,
  newSuppliers: 45,
  inactiveSuppliers: 70,
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

const Fornecedores = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'ativo' | 'inativo'>('todos');
  const [selectedFornecedor, setSelectedFornecedor] = useState<Fornecedor | null>(null);

  const filteredFornecedores = mockFornecedores.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.cnpj.includes(searchTerm);
    const matchesStatus = statusFilter === 'todos' || f.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const duplicatasDoFornecedor = useMemo(() => {
    if (!selectedFornecedor) return [];
    return generateDuplicatasForFornecedor(selectedFornecedor);
  }, [selectedFornecedor]);

  if (selectedFornecedor) {
    const totalValor = duplicatasDoFornecedor.reduce((sum, d) => sum + d.valor, 0);
    const negociadas = duplicatasDoFornecedor.filter(d => d.statusNegociacao === 'negociada').length;
    const naoNegociadas = duplicatasDoFornecedor.length - negociadas;

    return (
      <div className="p-8 min-h-full max-h-full overflow-y-auto">
        {/* Back + Header */}
        <div className="mb-6">
          <button
            onClick={() => setSelectedFornecedor(null)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Fornecedores
          </button>

          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-700 rounded-full text-lg font-bold">
              {selectedFornecedor.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedFornecedor.name}</h1>
              <p className="text-sm text-gray-500">CNPJ: {selectedFornecedor.cnpj} &middot; {selectedFornecedor.city}</p>
            </div>
            <span className={`ml-auto inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              selectedFornecedor.status === 'ativo'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {selectedFornecedor.status === 'ativo' ? 'Ativo' : 'Inativo'}
            </span>
          </div>
        </div>

        {/* Supplier Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-5 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-500">Total de Duplicatas</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{duplicatasDoFornecedor.length}</p>
          </div>
          <div className="p-5 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-500">Valor Total</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValor)}</p>
          </div>
          <div className="p-5 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-500">Negociadas</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{negociadas}</p>
          </div>
          <div className="p-5 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDownRight className="w-5 h-5 text-amber-600" />
              <span className="text-sm text-gray-500">Não Negociadas</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{naoNegociadas}</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex items-center gap-6 mb-2 text-sm text-gray-600">
          <span className="flex items-center gap-1"><Mail className="w-4 h-4 text-gray-400" />{selectedFornecedor.contact}</span>
          <span className="flex items-center gap-1"><Phone className="w-4 h-4 text-gray-400" />{selectedFornecedor.phone}</span>
          <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-gray-400" />{selectedFornecedor.city}</span>
        </div>

        {/* Duplicatas Table */}
        <DuplicatasTable duplicatas={duplicatasDoFornecedor} />
      </div>
    );
  }

  return (
    <div className="p-8 min-h-full max-h-full overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Fornecedores</h1>
          <p className="text-gray-500 mt-1">Gestão e visão geral dos fornecedores cadastrados</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{summaryData.totalSuppliers.toLocaleString('pt-BR')}</h3>
            <p className="text-sm font-medium text-gray-700">Total de Fornecedores</p>
            <p className="text-xs text-gray-500">Cadastrados na plataforma</p>
          </div>
          <div className="p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{summaryData.activeSuppliers.toLocaleString('pt-BR')}</h3>
            <p className="text-sm font-medium text-gray-700">Fornecedores Ativos</p>
            <p className="text-xs text-gray-500">{((summaryData.activeSuppliers / summaryData.totalSuppliers) * 100).toFixed(1)}% do total</p>
          </div>
          <div className="p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <Building2 className="w-8 h-8 text-blue-600" />
              <div className="flex items-center text-sm text-green-600">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +18.4%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{summaryData.newSuppliers}</h3>
            <p className="text-sm font-medium text-gray-700">Novos Fornecedores</p>
            <p className="text-xs text-gray-500">Últimos 30 dias</p>
          </div>
          <div className="p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <ArrowDownRight className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{summaryData.inactiveSuppliers}</h3>
            <p className="text-sm font-medium text-gray-700">Fornecedores Inativos</p>
            <p className="text-xs text-gray-500">Sem atividade recente</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="p-4 border-b border-gray-200 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome ou CNPJ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'todos' | 'ativo' | 'inativo')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="todos">Todos</option>
                <option value="ativo">Ativos</option>
                <option value="inativo">Inativos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Suppliers Table */}
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Fornecedor</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">CNPJ</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Cidade</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Duplicatas</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Total</th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Última Atividade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredFornecedores.map((fornecedor) => (
                  <tr key={fornecedor.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-9 h-9 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                          {fornecedor.name.charAt(0)}
                        </div>
                        <div>
                          <button
                            onClick={() => setSelectedFornecedor(fornecedor)}
                            className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors text-left flex items-center gap-1"
                          >
                            {fornecedor.name}
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {fornecedor.contact}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{fornecedor.cnpj}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        {fornecedor.city}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium text-right">
                      {fornecedor.duplicates.toLocaleString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium text-right">
                      {formatCurrencyCompact(fornecedor.value)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        fornecedor.status === 'ativo'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {fornecedor.status === 'ativo' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center">
                      {new Date(fornecedor.lastActivity).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredFornecedores.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Nenhum fornecedor encontrado com os filtros aplicados.
            </div>
          )}
        </div>
    </div>
  );
};

export default Fornecedores;
