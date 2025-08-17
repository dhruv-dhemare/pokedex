import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function PokemonList({ pokemon }) {
  const [selected, setSelected] = useState(null);
  const [description, setDescription] = useState('');

  const openOverlay = async (p) => {
    setSelected(p);
    setDescription('Loading...');
    try {
      const res = await axios.get(`http://localhost:5000/api/pokemon/description/${p.name}`);
      setDescription(res.data.description);
    } catch {
      setDescription('Description not available.');
    }
  };

  const closeOverlay = () => setSelected(null);

  return (
    <div className="grid-container">
      {pokemon.map((p, index) => (
        <div
          key={index}
          className={`pokemon-card ${selected ? 'blurred' : ''}`}
          onClick={() => openOverlay(p)}
        >
          <img src={p.image} alt={p.name} className="pokemon-img" />
          <h3 className="pokemon-name">{p.name}</h3>
          <p className="pokemon-info">
            Height: {p.height}<br />
            Weight: {p.weight}
          </p>
        </div>
      ))}

      {selected && (
        <div className="overlay">
          <div className="overlay-content">
            <button className="close-btn" onClick={closeOverlay}>×</button>
           <h2 style={{ textTransform: 'uppercase' }}>{selected.name}</h2>
            <img src={selected.image} alt={selected.name} className="pokemon-img" />
            <p><strong>Height:</strong> {selected.height}</p>
            <p><strong>Weight:</strong> {selected.weight}</p>
            <p><strong>Types:</strong> {selected.types.join(', ')}</p>
            <p><strong>Description:</strong> {description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonList;
