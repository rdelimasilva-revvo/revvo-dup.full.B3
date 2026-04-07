import { StatusManifestacao } from '../types/bill';

interface StatusInfo {
  label: string;
  shortLabel: string;
  bgColor: string;
  textColor: string;
}

export const STATUS_CONFIG: Record<StatusManifestacao, StatusInfo> = {
  recebida: { label: 'Recebida', shortLabel: 'Recebida', bgColor: 'bg-gray-100', textColor: 'text-gray-700' },
  em_analise_automatica: { label: 'Em Análise Automática', shortLabel: 'Análise Auto.', bgColor: 'bg-sky-100', textColor: 'text-sky-700' },
  em_fila_processamento: { label: 'Em Fila de Processamento', shortLabel: 'Fila Process.', bgColor: 'bg-sky-100', textColor: 'text-sky-700' },
  em_fila_analise: { label: 'Em Fila de Análise', shortLabel: 'Fila Análise', bgColor: 'bg-sky-100', textColor: 'text-sky-700' },
  pendente: { label: 'Pendente de Manifestação', shortLabel: 'Pendente', bgColor: 'bg-gray-100', textColor: 'text-gray-900' },
  aceite_automatico: { label: 'Aceite Automático', shortLabel: 'Aceite Auto.', bgColor: 'bg-emerald-100', textColor: 'text-emerald-700' },
  recusa_automatica: { label: 'Recusa Automática', shortLabel: 'Recusa Auto.', bgColor: 'bg-red-100', textColor: 'text-red-700' },
  reprocessamento: { label: 'Reprocessamento', shortLabel: 'Reprocess.', bgColor: 'bg-sky-100', textColor: 'text-sky-700' },
  aceite_manual: { label: 'Aceite Manual', shortLabel: 'Aceite Manual', bgColor: 'bg-emerald-100', textColor: 'text-emerald-700' },
  recusa_manual: { label: 'Recusa Manual', shortLabel: 'Recusa Manual', bgColor: 'bg-red-100', textColor: 'text-red-700' },
  aceito: { label: 'Aceita', shortLabel: 'Aceita', bgColor: 'bg-green-100', textColor: 'text-green-700' },
  aceito_decurso_prazo: { label: 'Aceita por Decurso de Prazo', shortLabel: 'Aceita D.P.', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
  rejeitado: { label: 'Rejeitada', shortLabel: 'Rejeitada', bgColor: 'bg-red-100', textColor: 'text-red-700' },
  contestada: { label: 'Contestada', shortLabel: 'Contestada', bgColor: 'bg-orange-100', textColor: 'text-orange-700' },
  reaberta: { label: 'Reaberta', shortLabel: 'Reaberta', bgColor: 'bg-gray-100', textColor: 'text-gray-900' },
};

export const AUTO_ANALYSIS_STATUSES: StatusManifestacao[] = [
  'recebida', 'em_analise_automatica', 'em_fila_processamento', 'em_fila_analise', 'reprocessamento',
];

export const MANIFESTABLE_STATUSES: StatusManifestacao[] = [
  'pendente', 'reaberta',
];

export const PENDING_STATUSES: StatusManifestacao[] = [
  ...MANIFESTABLE_STATUSES, ...AUTO_ANALYSIS_STATUSES,
];

export const ACCEPTED_STATUSES: StatusManifestacao[] = [
  'aceito', 'aceito_decurso_prazo', 'aceite_automatico', 'aceite_manual',
];

export const REJECTED_STATUSES: StatusManifestacao[] = [
  'rejeitado', 'recusa_automatica', 'recusa_manual',
];

export const STATUS_SORT_ORDER: Record<StatusManifestacao, number> = {
  recebida: 0,
  em_analise_automatica: 1,
  em_fila_processamento: 2,
  em_fila_analise: 3,
  pendente: 4,
  reaberta: 5,
  reprocessamento: 6,
  aceite_automatico: 7,
  aceite_manual: 8,
  aceito: 9,
  aceito_decurso_prazo: 10,
  recusa_automatica: 11,
  recusa_manual: 12,
  rejeitado: 13,
  contestada: 14,
};

export const STATUS_FILTER_GROUPS = [
  {
    label: 'Em andamento',
    options: [
      { value: 'recebida', label: 'Recebida' },
      { value: 'pendente', label: 'Pendente' },
      { value: 'em_analise_automatica', label: 'Em Análise Automática' },
      { value: 'em_fila_processamento', label: 'Em Fila de Processamento' },
      { value: 'em_fila_analise', label: 'Em Fila de Análise' },
      { value: 'reprocessamento', label: 'Reprocessamento' },
      { value: 'reaberta', label: 'Reaberta' },
    ],
  },
  {
    label: 'Aceitas',
    options: [
      { value: 'aceite_automatico', label: 'Aceite Automático' },
      { value: 'aceite_manual', label: 'Aceite Manual' },
      { value: 'aceito', label: 'Aceita' },
      { value: 'aceito_decurso_prazo', label: 'Aceita por Decurso de Prazo' },
    ],
  },
  {
    label: 'Rejeitadas',
    options: [
      { value: 'recusa_automatica', label: 'Recusa Automática' },
      { value: 'recusa_manual', label: 'Recusa Manual' },
      { value: 'rejeitado', label: 'Rejeitada' },
    ],
  },
  {
    label: 'Outros',
    options: [
      { value: 'contestada', label: 'Contestada' },
    ],
  },
];
