# Pokédex

A comprehensive Pokémon encyclopedia built with **React**, featuring a **Node.js + Python backend**, and deployed on **Netlify**. This application allows users to explore detailed information about Pokémon, including their types, abilities, stats, and evolutions.

## Live Demo

Experience the Pokédex in action:

🔗 [https://pokedex-dhruv.netlify.app/](https://pokedex-dhruv.netlify.app/)

## Features

- **Detailed Pokémon Information**: Access comprehensive data on each Pokémon, including stats, abilities, and evolutions.
- **Search Functionality**: Quickly find any Pokémon by name or ID.
- **Type-Based Filtering**: Filter Pokémon by their types to explore specific categories.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js + Python
- **API**: PokéAPI
- **Deployment**: Netlify

## Installation & Setup

### Prerequisites

Make sure you have installed:

- Node.js
- npm or yarn
- Python 3.x
- pip (Python package manager)

### Steps

Clone the repository and install everything in one go:

# Clone the repository
git clone https://github.com/dhruv-dhemare/pokedex.git

cd pokedex

# Install Node.js dependencies for backend
cd backend

npm install

# Install Python dependencies
pip install -r requirements.txt


# Start Node.js server
node index.js


# Start Python services (if needed for certain endpoints)
python python/fetch_description.py


# Open a new terminal/tab to start frontend
cd ../frontend

npm install

npm start

Open your browser at [http://localhost:3000](http://localhost:3000) to access the Pokédex.

## Usage

- Search for any Pokémon by name in the search bar.
- Click on a Pokémon to see detailed stats and description.
- Filter Pokémon using the type filters.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

