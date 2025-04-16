# Movie Discovery App

## Introduction

This application allows users to browse and discover movies. Users can view movie details and, optionally, authenticate to save their favorite movies or create watchlists (feature not yet implemented).

## Features

- Browse a catalog of movies
- View detailed information about each movie (title, description, genre, etc.)
- User authentication (for future features like saving favorites)

## Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Drizzle
- **Authentication:** NextAuth.js

## Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`
3. Set up your environment variables (database connection, etc.). See `.env.example` for required variables.
4. Run database migrations: `npx drizzle-kit push:pg`
5. Start the development server: `npm run dev`

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Implement your changes.
4. Submit a pull request.

