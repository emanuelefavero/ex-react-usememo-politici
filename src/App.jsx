import { useEffect, useMemo, useState } from 'react';
import { PoliticiansList } from './components/PoliticiansList';
import { Input } from './components/ui/Input';
import { Select } from './components/ui/Select';
import { fetchJson } from './lib/api';
import './App.css';

const API_URL = 'http://localhost:3333';
const RESOURCE = 'politicians';

const initialFilter = {
  search: '',
  position: '',
};

export const App = () => {
  const [filter, setFilter] = useState(initialFilter);
  const [state, setState] = useState({ step: 'idle' });

  const filteredPoliticians = useMemo(() => {
    if (state.step !== 'success') return [];

    const formattedSearch = filter.search.trim().toLowerCase();

    return state.data.filter(
      politician =>
        (politician.name.toLowerCase().includes(formattedSearch) ||
          politician.biography.toLowerCase().includes(formattedSearch)) &&
        (filter.position === '' || politician.position === filter.position),
    );
  }, [state, filter.search, filter.position]);

  // Derive unique positions from the fetched politicians
  const uniquePositions = useMemo(() => {
    if (state.step !== 'success') return [];
    const positions = state.data.map(politician => politician.position);
    return Array.from(new Set(positions));
  }, [state]);

  useEffect(() => {
    const getPoliticians = async () => {
      setState({ step: 'loading' });

      try {
        const data = await fetchJson(`${API_URL}/${RESOURCE}`);
        setState({ step: 'success', data });
      } catch (error) {
        setState({ step: 'error', error: error.message });
      }
    };

    getPoliticians();
  }, []);

  const getContent = () => {
    switch (state.step) {
      case 'idle':
      default:
        return null;

      case 'loading':
        return <p role='status'>Loading...</p>;

      case 'success':
        const handleFilterChange = e =>
          setFilter({ ...filter, search: e.target.value });

        return (
          <>
            <form className='filter-form' onSubmit={e => e.preventDefault()}>
              <Input
                placeholder='Search politician'
                value={filter.search}
                onChange={handleFilterChange}
                aria-label='Search politician'
              />

              <Select
                value={filter.position}
                onChange={e =>
                  setFilter({ ...filter, position: e.target.value })
                }
                aria-label='Filter by position'
              >
                <option value=''>All positions</option>
                {uniquePositions.map(position => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </Select>
            </form>

            {filteredPoliticians.length === 0 ? (
              <p role='status'>No politicians found.</p>
            ) : (
              <PoliticiansList politicians={filteredPoliticians} />
            )}
          </>
        );

      case 'error':
        return <p role='alert'>Error: {state.error}</p>;
    }
  };

  return (
    <main className='container'>
      <h1>Politicians</h1>

      {getContent()}
    </main>
  );
};
