import { useEffect, useMemo, useState } from 'react';
import { PoliticiansList } from './components/PoliticiansList';
import { Input } from './components/ui/Input';
import { fetchJson } from './lib/api';
import './App.css';

const API_URL = 'http://localhost:3333';
const RESOURCE = 'politicians';

export const App = () => {
  const [search, setSearch] = useState('');
  const [state, setState] = useState({ step: 'idle' });

  const filteredPoliticians = useMemo(() => {
    if (state.step !== 'success') return [];

    const formattedSearch = search.trim().toLowerCase();

    return state.data.filter(
      politician =>
        politician.name.toLowerCase().includes(formattedSearch) ||
        politician.biography.toLowerCase().includes(formattedSearch),
    );
  }, [state, search]);

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
            <Input
              placeholder='Search politician'
              value={search}
              onChange={e => setSearch(e.target.value)}
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
