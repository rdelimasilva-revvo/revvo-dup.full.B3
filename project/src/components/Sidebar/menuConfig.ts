import {
  BarChart3,
  CreditCard,
  Banknote,
  ToggleLeft,
  Users,
  Cog,
  CloudCog
} from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export const menuItems = [
  { icon: BarChart3, label: 'Dashboard Escritural', route: ROUTES.HOME },
  {
    icon: CreditCard,
    label: 'Recebíveis',
    route: ROUTES.RECEIVABLES,
    items: [
      { label: 'Escrituração', route: ROUTES.RECEIVABLES },
      { label: 'Duplicatas', route: ROUTES.DUPLICATAS },
    ],
  },
  {
    icon: Banknote,
    label: 'Pagamentos',
    route: ROUTES.SUPPLIER_MANAGEMENT,
    items: [
      { label: 'Duplicatas Recebidas', route: ROUTES.NOTIFICACOES_DUPLICATAS },
      { label: 'Gestão de Domicílio', route: ROUTES.DOMICILE_MANAGEMENT_NEW },
      { label: 'Novos Recebedores', route: ROUTES.FORNECEDOR_DIVERGENTE_LEGACY },
      { label: 'Relatório de Pagamentos', route: ROUTES.PAYMENT_REPORT },
      { label: 'Duas Etapas', route: ROUTES.DUAS_ETAPAS }
    ],
  },
  {
    icon: ToggleLeft,
    label: 'Gestão de Opt-in',
    route: ROUTES.OPT_IN_MANAGEMENT,
  },
  {
    icon: Users,
    label: 'Agente Intermediador',
    route: ROUTES.AGENTE_INTERMEDIADOR,
    items: [
      { label: 'Fornecedores', route: ROUTES.AGENTE_INTERMEDIADOR_FORNECEDORES },
      { label: 'Visão de Negociações', route: ROUTES.AGENTE_INTERMEDIADOR_VISAO_NEGOCIACOES },
    ],
  },
  {
    icon: CloudCog,
    label: 'Automações',
    route: ROUTES.AUTOMACOES_MANIFESTACAO,
    items: [
      { label: 'Manifestação', route: ROUTES.AUTOMACOES_MANIFESTACAO },
      { label: 'Escrituração', route: ROUTES.AUTOMACOES_ESCRITURACAO },
    ],
  },
] as const;

export const footerMenuItems = [
  {
    icon: Cog,
    label: 'Configurações',
    route: ROUTES.SETTINGS,
    items: [
      { label: 'Concessão automática de crédito'},
      { label: 'Assinaturas'},
      { label: 'Perfis e acessos', route: ROUTES.PROFILES_ACCESS },
      { label: 'Alertas e notificações'},
    ],
  },
] as const;

export const findParentRoutes = (items: any[], targetRoute: string, path: string[] = []): string[] => {
  for (const item of items) {
    if (item.route === targetRoute) {
      return [...path, item.route];
    }
    if (item.items) {
      const found = findParentRoutes(item.items, targetRoute, [...path, item.route]);
      if (found.length) return found;
    }
  }
  return [];
};
