import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonList from './PokemonList';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const limit = 20;

  const fetchPokemon = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await axios.get(`http://localhost:5000/api/pokemon?limit=${limit}&offset=${offset}`);

      setPokemon(prev => [...prev, ...res.data]);
      setOffset(prev => prev + limit);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPokemon(); }, []);

  const typesAvailable = Array.from(
    new Set(
      pokemon.flatMap(p => p.types.map(t => t.charAt(0).toUpperCase() + t.slice(1)))
    )
  );

  const filteredPokemon = pokemon.filter(p => {
    const matchesName = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter ? p.types.includes(typeFilter.toLowerCase()) : true;
    return matchesName && matchesType;
  });

  return (
    <div className="app-container">
      <h1 className="app-title">⚡ Pokédex ⚡</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="search-input"
        >
          <option value="">All Types</option>
          {typesAvailable.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {error && <div className="error">Oops! Something went wrong.</div>}

      <PokemonList pokemon={filteredPokemon} />

      {loading && <div className="loading">⚡ Loading Pokémagic ⚡</div>}

      <div className="load-more-container">
        <button className="load-btn" onClick={fetchPokemon} disabled={loading}>
          Load More Pokémon!
        </button>
      </div>
    </div>
  );
}

export default App;
