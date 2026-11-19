import { useEffect, useState } from 'react';
import { PoliticiansList } from './components/PoliticiansList';
import { fetchJson } from './lib/api';
import './App.css';

const API_URL = 'http://localhost:3333';
const RESOURCE = 'politicians';

export const App = () => {
  const [state, setState] = useState({ step: 'idle' });

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
        const { data: politicians } = state;

        if (!politicians || politicians.length === 0)
          return <p role='status'>No politicians found.</p>;

        return <PoliticiansList politicians={politicians} />;

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
