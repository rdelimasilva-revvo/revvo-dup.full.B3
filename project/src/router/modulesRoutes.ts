import { ReactNode } from 'react';
import { escrituracaoDuplicataRoutes } from '@/modules/escrituracaoDuplicata/routes';
import { notificacaoDuplicataRoutes } from '@/modules/notificacaoDuplicata/routes';
import { gestorDomicilioRoutes } from '@/modules/gestorDomicilio/routes';
import { automacoesRoutes } from '@/modules/automacoes/routes';
import { duplicatasRoutes } from '@/modules/duplicatas/routes';

export interface ModuleRoute {
  path: string;
  element: ReactNode;
}

export const modulesRoutes: ModuleRoute[] = [
  ...escrituracaoDuplicataRoutes,
  ...notificacaoDuplicataRoutes,
  ...gestorDomicilioRoutes,
  ...automacoesRoutes,
  ...duplicatasRoutes,
];
