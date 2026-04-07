import { useState, useMemo } from 'react';
import styled from 'styled-components';
import { CaretUp, CaretDown, FunnelSimple } from '@phosphor-icons/react';
import { DuplicatasTable } from './components/DuplicatasTable';
import { mockDuplicatas } from './data/mockDuplicatas';
import { StatusNegociacao } from './types/duplicata';

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f5f5f5;
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  padding: 24px;
  min-height: 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const Header = styled.header`
  margin-bottom: 24px;
`;

const FilterSection = styled.div`
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 12px 20px;
  margin-bottom: 20px;

  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    user-select: none;

    h3 {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #1d2d3e;
    }
  }

  .filter-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px 16px;
    margin-bottom: 12px;
    margin-top: 12px;
  }

  .filter-field {
    display: flex;
    flex-direction: column;
    gap: 4px;

    label {
      font-size: 13px;
      font-weight: 500;
      color: #1d2d3e;
    }

    input, select {
      height: 36px;
      padding: 0 12px;
      border: 1px solid #e5e5e5;
      border-radius: 6px;
      font-size: 14px;
      background: white;
      color: #1d2d3e;

      &::placeholder {
        color: #9ca3af;
      }

      &:focus {
        outline: none;
        border-color: #0070f2;
      }
    }
  }

  .filter-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;

    button {
      height: 36px;
      padding: 0 20px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      border: 1px solid #e5e5e5;
      background: white;
      color: #1d2d3e;

      &:hover {
        background: #f9fafb;
      }

      &.primary {
        background: #0070f2;
        color: white;
        border: none;

        &:hover {
          background: #0056cc;
        }
      }
    }
  }

  @media (max-width: 640px) {
    padding: 16px;

    .filter-content {
      grid-template-columns: 1fr;
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h4 {
    font-size: 13px;
    color: #556b82;
    margin: 0 0 8px 0;
    font-weight: 500;
  }

  .value {
    font-size: 28px;
    font-weight: 700;
    color: #1d2d3e;
  }

  .sub {
    font-size: 12px;
    color: #556b82;
    margin-top: 4px;
  }
`;

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function Duplicatas() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '' as '' | StatusNegociacao,
    sacado: '',
    dataVencimento: '',
  });

  const filteredDuplicatas = useMemo(() => {
    return mockDuplicatas.filter((d) => {
      if (filters.status && d.statusNegociacao !== filters.status) return false;
      if (filters.sacado && !d.sacado.name.toLowerCase().includes(filters.sacado.toLowerCase())) return false;
      return true;
    });
  }, [filters]);

  const stats = useMemo(() => {
    const total = mockDuplicatas.length;
    const negociadas = mockDuplicatas.filter((d) => d.statusNegociacao === 'negociada');
    const naoNegociadas = mockDuplicatas.filter((d) => d.statusNegociacao === 'nao_negociada');
    const valorTotal = mockDuplicatas.reduce((acc, d) => acc + d.valor, 0);
    const valorNegociado = negociadas.reduce((acc, d) => acc + d.valor, 0);
    const valorNaoNegociado = naoNegociadas.reduce((acc, d) => acc + d.valor, 0);

    return {
      total,
      negociadas: negociadas.length,
      naoNegociadas: naoNegociadas.length,
      valorTotal,
      valorNegociado,
      valorNaoNegociado,
    };
  }, []);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ status: '', sacado: '', dataVencimento: '' });
  };

  return (
    <Container>
      <Main>
        <Header>
          <h2 className="text-2xl font-bold" style={{ color: '#1d2d3e' }}>Duplicatas</h2>
          <p className="text-sm mt-1" style={{ color: '#556b82' }}>
            Todas as duplicatas escrituradas e seus status de negociação
          </p>
        </Header>

        <StatsGrid>
          <StatCard>
            <h4>Total de Duplicatas</h4>
            <div className="value">{stats.total}</div>
            <div className="sub">R$ {formatCurrency(stats.valorTotal)}</div>
          </StatCard>
          <StatCard>
            <h4>Negociadas</h4>
            <div className="value" style={{ color: '#2563eb' }}>{stats.negociadas}</div>
            <div className="sub">R$ {formatCurrency(stats.valorNegociado)}</div>
          </StatCard>
          <StatCard>
            <h4>Não Negociadas</h4>
            <div className="value" style={{ color: '#d97706' }}>{stats.naoNegociadas}</div>
            <div className="sub">R$ {formatCurrency(stats.valorNaoNegociado)}</div>
          </StatCard>
        </StatsGrid>

        <FilterSection>
          <div className="filter-header" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <h3>
              <FunnelSimple size={18} weight="regular" />
              Filtros
            </h3>
            {isFilterOpen ? <CaretUp size={18} /> : <CaretDown size={18} />}
          </div>

          {isFilterOpen && (
            <>
              <div className="filter-content">
                <div className="filter-field">
                  <label>Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                  >
                    <option value="">Todos</option>
                    <option value="negociada">Negociada</option>
                    <option value="nao_negociada">Não negociada</option>
                  </select>
                </div>

                <div className="filter-field">
                  <label>Sacado</label>
                  <input
                    type="text"
                    placeholder="Nome do sacado..."
                    value={filters.sacado}
                    onChange={(e) => handleFilterChange('sacado', e.target.value)}
                  />
                </div>

                <div className="filter-field">
                  <label>Data de Vencimento</label>
                  <input
                    type="date"
                    value={filters.dataVencimento}
                    onChange={(e) => handleFilterChange('dataVencimento', e.target.value)}
                  />
                </div>
              </div>

              <div className="filter-actions">
                <button onClick={handleClearFilters}>Limpar</button>
                <button className="primary">Aplicar Filtros</button>
              </div>
            </>
          )}
        </FilterSection>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-base font-semibold" style={{ color: '#1d2d3e' }}>
            Duplicatas Escrituradas
          </h3>
          <DuplicatasTable duplicatas={filteredDuplicatas} />
        </div>
      </Main>
    </Container>
  );
}

export default Duplicatas;
