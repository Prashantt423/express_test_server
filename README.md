# Node.js Express Server with MongoDB

This server is built with Node.js and the Express framework, using MongoDB as the database. It provides an API for managing users information.

### Live Link
Access the api from `https://express-api-bpas.onrender.com`

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies: `npm install`

### Configuration

Create a `.env` file with the following environment variables:


Replace `<MONGO_URL>` with your MongoDB connection string.

### Usage

1. Start the server: `node index.js`
2. Navigate to `http://localhost:30001/api/readiness` to view readiness message.

### API Endpoints

- `GET /api/users/income`: Get a list of all users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes” (case incensitive).
- `GET /api/users/male`: Get a list of all male Users which have phone price greater than 10,000.
- `GET /api/users/quote`: Get a list of all users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.
- `GET /api/users/email`: Get a list of all users which have a car of brand “BMW”, “Mercedes” or “Audi” (case incensitive) and whose email does not include any digit.
- `GET /api/users/group`: Show the data of top 10 cities which have the highest number of users and their average income.

## Contributing

Contributions are welcome. See CONTRIBUTING.md for more information.

## License

This project is licensed under the MIT License. See LICENSE.md for details.
