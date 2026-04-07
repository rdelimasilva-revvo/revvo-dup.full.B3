import React, { useState, useEffect } from 'react';
import {
  FileText,
  DollarSign,
  TrendingUp,
  Clock,
  Target,
  BarChart3,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const mockData = {
  volumes: {
    totalDuplicates: 45680,
    totalBilled: 125600000,
    billedToSacado: 89200000,
    billedToSacadoOutros: 36400000,
    growthRate: 12.5
  },
  tickets: {
    averageTicket: 2750,
    medianTicket: 1850,
    maxTicket: 45000,
    minTicket: 150,
    ticketGrowth: 8.3
  },
  deadlines: {
    averageDays: 32,
    medianDays: 28,
    maxDays: 90,
    minDays: 7,
    onTimeRate: 87.5
  },
  alerts: [
    { id: 1, type: 'warning', message: 'Fornecedor Alpha Ltda com 15 duplicatas vencidas há mais de 30 dias', date: '2026-04-07' },
    { id: 2, type: 'error', message: 'Beta Indústria S.A. com divergência de valores em 3 duplicatas', date: '2026-04-06' },
    { id: 3, type: 'success', message: 'Gamma Comércio regularizou 8 duplicatas pendentes', date: '2026-04-06' },
    { id: 4, type: 'warning', message: '23 duplicatas próximas do vencimento nos próximos 5 dias', date: '2026-04-07' },
    { id: 5, type: 'error', message: 'Delta Serviços S.A. com domicílio bancário divergente', date: '2026-04-05' },
  ],
  monthlyData: [
    { month: 'Jan', duplicates: 3800, billed: 10200000 },
    { month: 'Fev', duplicates: 4100, billed: 11500000 },
    { month: 'Mar', duplicates: 3950, billed: 10800000 },
    { month: 'Abr', duplicates: 4300, billed: 12100000 },
    { month: 'Mai', duplicates: 4650, billed: 13200000 },
    { month: 'Jun', duplicates: 4200, billed: 11800000 }
  ]
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

const StatCard = ({ title, value, subtitle, icon: Icon, trend, trendValue, color = 'blue' }: any) => {
  const colorClasses: Record<string, string> = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600',
    purple: 'text-purple-600',
    indigo: 'text-indigo-600'
  };

  return (
    <div className={`p-6 rounded-lg border border-gray-200 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-8 h-8" />
        {trend && (
          <div className={`flex items-center text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
            {trendValue}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <p className="text-sm font-medium text-gray-700">{title}</p>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
};

const Monitoramento = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const alertIcons: Record<string, React.ReactNode> = {
    warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    success: <CheckCircle2 className="w-5 h-5 text-green-500" />,
  };

  const alertBg: Record<string, string> = {
    warning: 'bg-yellow-50 border-yellow-200',
    error: 'bg-red-50 border-red-200',
    success: 'bg-green-50 border-green-200',
  };

  return (
    <div className="p-8 min-h-full max-h-full overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Monitoramento</h1>
            <p className="text-gray-500 mt-1">Acompanhamento em tempo real das operações</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </button>
        </div>

        {/* Volume de Duplicatas */}
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Volume de Duplicatas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total de Duplicatas" value={mockData.volumes.totalDuplicates.toLocaleString('pt-BR')} subtitle="Criadas pelos fornecedores" icon={FileText} trend="up" trendValue={`+${mockData.volumes.growthRate}%`} color="blue" />
          <StatCard title="Valor Total Faturado" value={formatCurrencyCompact(mockData.volumes.totalBilled)} subtitle="Soma de todas as duplicatas" icon={DollarSign} trend="up" trendValue="+15.2%" color="green" />
          <StatCard title="Faturado vs Sacado" value={formatCurrencyCompact(mockData.volumes.billedToSacado)} subtitle={`${((mockData.volumes.billedToSacado / mockData.volumes.totalBilled) * 100).toFixed(1)}% do total`} icon={Target} color="indigo" />
          <StatCard title="Faturado vs Sacado-Outros" value={formatCurrencyCompact(mockData.volumes.billedToSacadoOutros)} subtitle={`${((mockData.volumes.billedToSacadoOutros / mockData.volumes.totalBilled) * 100).toFixed(1)}% do total`} icon={Building2} color="purple" />
        </div>

        {/* KPIs de Tickets */}
        <h2 className="text-lg font-semibold text-gray-900 mb-3">KPIs de Tickets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <StatCard title="Ticket Médio" value={formatCurrency(mockData.tickets.averageTicket)} subtitle="Por duplicata" icon={BarChart3} trend="up" trendValue={`+${mockData.tickets.ticketGrowth}%`} color="green" />
          <StatCard title="Ticket Mediano" value={formatCurrency(mockData.tickets.medianTicket)} subtitle="Valor central" icon={TrendingUp} color="blue" />
          <StatCard title="Maior Ticket" value={formatCurrency(mockData.tickets.maxTicket)} subtitle="Valor máximo" icon={ArrowUpRight} color="purple" />
          <StatCard title="Menor Ticket" value={formatCurrency(mockData.tickets.minTicket)} subtitle="Valor mínimo" icon={ArrowDownRight} color="yellow" />
          <StatCard title="Variação" value={`${(mockData.tickets.maxTicket / mockData.tickets.minTicket).toFixed(0)}x`} subtitle="Max vs Min" icon={TrendingUp} color="indigo" />
        </div>

        {/* KPIs de Prazos */}
        <h2 className="text-lg font-semibold text-gray-900 mb-3">KPIs de Prazos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <StatCard title="Prazo Médio" value={`${mockData.deadlines.averageDays} dias`} subtitle="Tempo médio de vencimento" icon={Clock} color="yellow" />
          <StatCard title="Prazo Mediano" value={`${mockData.deadlines.medianDays} dias`} subtitle="Prazo central" icon={Calendar} color="blue" />
          <StatCard title="Maior Prazo" value={`${mockData.deadlines.maxDays} dias`} subtitle="Prazo máximo" icon={ArrowUpRight} color="red" />
          <StatCard title="Menor Prazo" value={`${mockData.deadlines.minDays} dias`} subtitle="Prazo mínimo" icon={ArrowDownRight} color="green" />
          <StatCard title="Taxa de Pontualidade" value={`${mockData.deadlines.onTimeRate}%`} subtitle="Pagamentos no prazo" icon={Target} trend="up" trendValue="+2.3%" color="green" />
        </div>

        {/* Alertas Recentes */}
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Alertas Recentes</h2>
        <div className="space-y-3 mb-6">
          {mockData.alerts.map((alert) => (
            <div key={alert.id} className={`flex items-start gap-3 p-4 rounded-lg border ${alertBg[alert.type]}`}>
              {alertIcons[alert.type]}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(alert.date).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Evolução Mensal */}
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Evolução Mensal - Últimos 6 Meses</h2>
        <div className="grid grid-cols-6 gap-4">
          {mockData.monthlyData.map((month, index) => (
            <div key={index} className="text-center">
              <div className="border border-gray-200 rounded-lg p-4 mb-2">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {month.duplicates.toLocaleString('pt-BR')}
                </div>
                <div className="text-xs text-blue-500 mb-2">duplicatas</div>
                <div className="text-sm font-medium text-gray-900">
                  {formatCurrencyCompact(month.billed)}
                </div>
              </div>
              <div className="text-sm font-medium text-gray-700">{month.month}</div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default Monitoramento;
