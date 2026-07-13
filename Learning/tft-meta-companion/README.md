# TFT Meta Companion

A full-stack Teamfight Tactics analytics application that imports Riot match data, aggregates champion and item performance metrics, and presents current meta information through a responsive React interface.

The project also includes an AI coaching feature that accepts a player's current game state and returns a structured recommendation with a game plan and pivot options.

> **Status:** Active portfolio project. Champion and item statistics are generated from imported Riot match data. Some features are still being expanded.

## Highlights

- Imports and stores TFT match data from the Riot Games API
- Processes nested participant, unit, placement, and item data
- Calculates average placement, pick rate, top-four rate, and win rate
- Persists derived statistics in PostgreSQL through Prisma upserts
- Displays champion, item, augment, and meta-composition information
- Provides JWT-based signup and login flows
- Returns schema-validated AI coaching responses with fallback handling
- Separates backend routes, controllers, services, types, and database logic

## Screenshots

<img width="1422" height="830" alt="image" src="https://github.com/user-attachments/assets/b35a83e6-30d0-4d11-a598-ac85fff3d98c" />

## Live Demo

- **Frontend: https://client-six-red.vercel.app/
- **API: https://tft-meta-companion-server.onrender.com

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

### Backend

- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JSON Web Tokens
- bcrypt
- OpenAI API
- Riot Games API

## Architecture

```text
React Client
    |
    | REST API
    v
Express Routes
    |
    v
Controllers
    |
    v
Services
    |
    +-------------------+
    |                   |
    v                   v
PostgreSQL / Prisma   External APIs
                      - Riot Games API
                      - OpenAI API
```

The backend follows a route-controller-service structure:

- **Routes** define HTTP endpoints.
- **Controllers** handle requests, responses, and status codes.
- **Services** contain business logic, data processing, and external API integrations.
- **Prisma** manages database access and persistence.

## Statistics Pipeline

The statistics pipeline is the core technical feature of the project.

1. Match data is requested from the Riot Games API.
2. Raw match payloads are stored in PostgreSQL.
3. The aggregation service iterates through matches and participants.
4. Champion and item results are grouped into in-memory aggregation buckets.
5. The service calculates:
   - games played
   - average placement
   - pick rate
   - top-four rate
   - win rate
6. Derived statistics are persisted through Prisma upserts.
7. The frontend requests the prepared statistics and renders ranked tables.

### Metric Definitions

| Metric | Definition |
| --- | --- |
| Average placement | Total placement divided by games played |
| Pick rate | Appearances divided by total participants |
| Top-four rate | Top-four finishes divided by games played |
| Win rate | First-place finishes divided by games played |

## AI Coach

The AI coach accepts information such as:

- current round
- selected augments
- current units
- current items

The backend requests a structured recommendation from the OpenAI API and validates the returned JSON before sending it to the client. If the API key is unavailable or the response cannot be parsed, the service returns a safe fallback response.

The current implementation is prompt-based. A future version will ground recommendations in the application's stored meta compositions and aggregated statistics.

## Project Structure

```text
tft-meta-companion/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   └── package.json
├── server/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── generated/
│   │   ├── lib/
│   │   ├── routes/
│   │   ├── services/
│   │   └── types/
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- PostgreSQL
- Riot Games API key
- OpenAI API key, optional for the AI coach

### 1. Clone the repository

```bash
git clone https://github.com/gianghuynh27/WebDev.git
cd WebDev/Learning/tft-meta-companion
```

### 2. Configure the server

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=4000
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="replace-with-a-long-random-secret"
RIOT_API_KEY="your-riot-api-key"
RIOT_REGIONAL_ROUTE="americas"
OPENAI_API_KEY="your-openai-api-key"
OPENAI_MODEL="your-supported-model"
```

`OPENAI_API_KEY` is optional. Without it, the AI coach returns a mock fallback response.

Generate the Prisma client and apply migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

Start the server:

```bash
npm run dev
```

The API runs on `http://localhost:4000` by default.

### 3. Configure the client

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

If the client uses an environment variable for the API base URL, create `client/.env` and point it to the backend:

```env
VITE_API_URL="http://localhost:4000/api"
```

The frontend runs on the local URL shown by Vite.

## Available Features

- Browse curated TFT meta compositions
- Explore champion statistics
- Explore item statistics
- View augment information
- Import Riot TFT match data
- Rebuild aggregated statistics
- Create an account and log in
- Request an AI coaching recommendation

## API Overview

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/signup` | Register a user |
| `POST` | `/api/auth/login` | Log in and receive authentication data |
| `GET` | `/api/stats/champions` | Return aggregated champion statistics |
| `GET` | `/api/stats/items` | Return aggregated item statistics |
| `POST` | `/api/stats/rebuild-stats` | Rebuild stored statistics from imported matches |
| `GET` | `/api/static/...` | Return static TFT game data |
| `POST` | `/api/riot/...` | Import or retrieve Riot match data |
| `POST` | `/api/coach/...` | Request an AI coaching recommendation |

Some route details may change while the application remains under active development.

## Database Models

The primary data models include:

- `User`
- `MetaComp`
- `RiotMatch`
- `StaticChampion`
- `StaticItem`
- `StaticAugment`
- `StaticTrait`
- `ChampionStat`
- `ItemStat`
- `AugmentStat`

Raw Riot match payloads are retained for reproducibility, while prepared statistics are stored separately for efficient frontend reads.

## Current Limitations

- Statistics rebuilding currently processes all stored matches.
- The rebuild operation is synchronous.
- The AI coach is not yet grounded in stored meta statistics.
- Automated test coverage and continuous integration are planned.
- Authentication and authorization should be expanded before public production use.

## Planned Improvements

- Incremental match processing
- Protected administrative aggregation endpoints
- Batch or background statistics rebuilding
- Grounded AI recommendations using current application data
- Automated unit and integration tests
- GitHub Actions for linting, testing, and builds
- Improved caching and API rate limiting
- Additional filters and sorting for the statistics explorer

## What I Learned

This project helped me practice:

- designing a full-stack TypeScript application
- consuming and storing external API data
- transforming deeply nested match payloads
- calculating and persisting derived analytics
- separating HTTP handling from business logic
- modeling domain-specific data with Prisma
- validating structured LLM output
- deploying a frontend and backend independently

## Disclaimer

TFT Meta Companion is an independent project and is not endorsed by Riot Games. Teamfight Tactics and Riot Games are trademarks or registered trademarks of Riot Games, Inc.
