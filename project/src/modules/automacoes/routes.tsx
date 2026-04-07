import React from 'react';
import Automacoes from '@/modules/automacoes';
import { ROUTES } from '@/constants/routes';

export const automacoesRoutes = [
  {
    path: ROUTES.AUTOMACOES,
    element: <Automacoes />,
  },
  {
    path: ROUTES.AUTOMACOES_MANIFESTACAO,
    element: <Automacoes defaultTab="manifestacao" />,
  },
  {
    path: ROUTES.AUTOMACOES_ESCRITURACAO,
    element: <Automacoes defaultTab="escrituracao" />,
  },
];
