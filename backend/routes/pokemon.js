const express = require('express');
const axios = require('axios');
const router = express.Router();
const { exec } = require('child_process');
const path = require('path');

// Get Pokémon list
router.get('/', async (req, res) => {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;

    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const results = await Promise.all(
            response.data.results.map(async (pokemon) => {
                const pokeDetails = await axios.get(pokemon.url);

                return {
                    name: pokeDetails.data.name,
                    image: pokeDetails.data.sprites.front_default,
                    height: (pokeDetails.data.height / 10).toFixed(2) + ' m',
                    weight: (pokeDetails.data.weight / 10).toFixed(1) + ' kg',
                    types: pokeDetails.data.types.map(t => t.type.name)
                };
            })
        );
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching Pokémon data" });
    }
});

// Get Pokémon description using Python
router.get('/description/:name', async (req, res) => {
    const name = req.params.name;
    const scriptPath = path.join(__dirname, '../python/fetch_description.py'); // adjust path

    exec(`python "${scriptPath}" ${name}`, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching description' });
        }
        res.json({ description: stdout.trim() });
    });
});

module.exports = router;
