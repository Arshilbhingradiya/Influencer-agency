# Influencer Agency Platform

A modern web application for managing influencer marketing campaigns, connecting companies with influencers, and streamlining campaign workflows.

## Features

- **Company Dashboard:**
  - Create, manage, and track influencer campaigns
  - View campaign analytics and application status
  - Manage company profile and settings
- **Influencer Dashboard:**
  - Browse and apply to available campaigns
  - Track application status and analytics
  - Manage influencer profile
- **Messaging & Notifications:**
  - In-app messaging between companies and influencers
  - Real-time notifications for campaign/application updates
- **Authentication:**
  - Secure login and signup for both companies and influencers
- **Responsive UI:**
  - Professional, user-friendly dashboards with analytics and visualizations

## Tech Stack

- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Other:** Axios, JWT Auth, REST API

## Project Structure

```
Influencer-agency/
  client/      # React frontend (Vite, Tailwind CSS)
  server/      # Node.js backend (Express, MongoDB)
  docker-compose.yml
  README.md
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or cloud)

### 1. Clone the Repository
```bash
git clone https://github.com/Arshilbhingradiya/influencer-agency.git
cd influencer-agency
```

### 2. Setup the Backend
```bash
cd server
npm install
# Create a .env file with your MongoDB URI and JWT secret
npm start
```

### 3. Setup the Frontend
```bash
cd ../client
npm install
npm run dev
```

### 4. Open in Browser
Visit [http://localhost:5173](http://localhost:5173) to use the app.

## Environment Variables
- See `.env.example` in both `client/` and `server/` for required environment variables.

## Docker Support
You can run the full stack with Docker Compose:
```bash
docker-compose up --build
```

## Screenshots
_Add screenshots of the dashboards and analytics here._

## License
[MIT](LICENSE)

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Contact
For questions or support, please open an issue or contact the maintainer.