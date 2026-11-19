import { useEffect, useMemo, useState } from 'react';
import { PoliticiansFilters } from './components/PoliticiansFilters';
import { PoliticiansList } from './components/PoliticiansList';
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

  // Filter politicians based on search and position criteria
  const filteredPoliticians = useMemo(() => {
    if (state.step !== 'success') return [];

    const formattedSearch = filter.search.trim().toLowerCase();

    return state.data.filter(politician => {
      const isInName = politician.name.toLowerCase().includes(formattedSearch);
      const isInBio = politician.biography
        .toLowerCase()
        .includes(formattedSearch);
      const allPoliticiansSelected = filter.position === '';
      const matchesPosition = politician.position === filter.position;

      return (
        (isInName || isInBio) && (allPoliticiansSelected || matchesPosition)
      );
    });
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
        return (
          <>
            <PoliticiansFilters
              filter={filter}
              positions={uniquePositions}
              onFilterChange={setFilter}
            />

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
