export type StatusNegociacao = 'negociada' | 'nao_negociada';

export interface Duplicata {
  id: string;
  numeroDuplicata: string;
  sacador: {
    name: string;
    cnpj: string;
  };
  sacado: {
    name: string;
    cnpj: string;
  };
  dataEmissao: string;
  dataVencimento: string;
  valor: number;
  statusNegociacao: StatusNegociacao;
  banco: string;
  numeroNota: string;
  serie: string;
  chaveNFe: string;
}
