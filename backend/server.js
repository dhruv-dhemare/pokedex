const express = require('express');
const cors = require('cors');
const pokemonRoutes = require('./routes/pokemon'); // make sure path is correct

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mount Pokémon router at /api/pokemon
app.use('/api/pokemon', pokemonRoutes);

// Optional root route
app.get('/', (req, res) => {
  res.send('Pokédex API running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
