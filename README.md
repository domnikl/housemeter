# Housemeter

A web application for tracking household utility meter readings (Electricity, Water, Gas) with visual charts and usage analysis.

## Features

- 📊 **Usage Tracking**: Record meter readings for Electricity, Water, and Gas
- 📈 **Visual Charts**: Monthly usage trends and yearly summaries
- 🏷️ **Color-coded Tags**: Easy identification of different resource types
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔐 **Simple Authentication**: Password-based access control
- 🗄️ **Local Database**: PostgreSQL backend for data storage

## Tech Stack

- **Frontend**: React, TypeScript, Chart.js
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: Password-based with session storage

## Setup Instructions

### Option 1: Docker Compose (Recommended)

The easiest way to run Housemeter is using Docker Compose, which sets up everything automatically.

#### Prerequisites

- Docker Desktop (or Docker Engine + Docker Compose)
- Git

#### Quick Start with Docker

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd housemeter
   ```

2. **Start the application:**

   ```bash
   # Using the provided script (recommended)
   ./start.sh

   # Or manually with Docker Compose
   docker-compose up --build -d
   ```

3. **Access the application:**

   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3002
   - Default password: `admin`

4. **Customize the password:**
   ```bash
   APP_PASSWORD=your_secure_password ./start.sh
   ```

#### Docker Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Restart services
docker-compose restart

# Remove everything (including database data)
docker-compose down -v

# Rebuild and start
docker-compose up --build -d
```

### Option 2: Manual Setup

#### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 1. Database Setup

1. Create a PostgreSQL database:

```sql
CREATE DATABASE housemeter;
```

2. The application will automatically create the required tables on first run.

### 2. Backend Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp env.example .env
```

4. Edit `.env` file with your database credentials and app password:

```env
# Server Configuration
PORT=3001

# Database Configuration
DB_USER=postgres
DB_HOST=localhost
DB_NAME=housemeter
DB_PASSWORD=your_database_password
DB_PORT=5432

# Application Password (set this to secure your app)
APP_PASSWORD=your_secure_app_password
```

5. Start the backend server:

```bash
npm start
```

### 3. Frontend Setup

1. Navigate to the project root:

```bash
cd ..
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Edit `.env` file:

```env
REACT_APP_API_URL=http://localhost:3001/api
```

5. Start the frontend development server:

```bash
npm start
```

### 4. Access the Application

1. Open your browser and go to `http://localhost:3000`
2. Enter the password you set in `APP_PASSWORD` in the server `.env` file
3. Start adding your meter readings!

## Usage

### Adding Measurements

1. Fill in the date, select the resource type, and enter the meter reading value
2. Click "Submit" to save the measurement
3. The measurement will appear in the table below

### Viewing Charts

- **Monthly Usage Chart**: Shows usage trends over time with line charts
- **Filtering**: Use the dropdown to filter by resource type
- **Responsive**: Charts adapt to different screen sizes

### Resource Types

- ⚡ **Electricity**: Orange color, measured in kWh
- 💧 **Water**: Teal color, measured in m³
- 🔥 **Gas**: Yellow color, measured in m³

## Development

### Project Structure

```
housemeter/
├── src/                    # Frontend React application
│   ├── components/         # React components
│   ├── ApiClient.ts        # API client for backend communication
│   └── ...
├── server/                 # Backend Express.js server
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   ├── Dockerfile          # Backend container configuration
│   └── ...
├── docker-compose.yml      # Multi-container orchestration
├── Dockerfile.frontend     # Frontend container configuration
├── start.sh                # Quick start script
└── package.json            # Frontend dependencies
```

### Docker Configuration

The application uses Docker Compose to orchestrate three services:

- **postgres**: PostgreSQL 15 database with persistent storage
- **backend**: Express.js API server with Node.js 18
- **frontend**: React development server with Node.js 18

**Key Features:**

- **Health Checks**: Database and backend services include health monitoring
- **Persistent Data**: PostgreSQL data is stored in a Docker volume
- **Network Isolation**: Services communicate through a dedicated network
- **Security**: Non-root users in containers
- **Environment Variables**: Configurable through Docker Compose

### API Endpoints

- `GET /api/health` - Health check
- `GET /api/measurements` - Get all measurements
- `POST /api/measurements` - Add new measurement
- `DELETE /api/measurements/:id` - Delete measurement

### Environment Variables

**Backend (.env in server directory):**

- `PORT` - Server port (default: 3001)
- `DB_USER` - PostgreSQL username
- `DB_HOST` - PostgreSQL host
- `DB_NAME` - Database name
- `DB_PASSWORD` - Database password
- `DB_PORT` - Database port (default: 5432)
- `APP_PASSWORD` - Application access password

**Frontend (.env in root directory):**

- `REACT_APP_API_URL` - Backend API URL

## GitHub Actions & Production Deployment

### Automated Builds

This repository includes GitHub Actions workflows that automatically build and push Docker images to GitHub Container Registry (ghcr.io) on:

- **Push to main/master branch**: Builds and pushes `latest` tag
- **Pull requests**: Builds and pushes branch-specific tags
- **Git tags**: Builds and pushes version tags (e.g., `v1.0.0`)

### Using Production Images

To use the pre-built images from GitHub Container Registry:

1. **Set your repository name:**

   ```bash
   export GITHUB_REPOSITORY=your-username/housemeter
   ```

2. **Use the production compose file:**

   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **Or pull specific versions:**

   ```bash
   # Pull latest images
   docker pull ghcr.io/your-username/housemeter/backend:latest
   docker pull ghcr.io/your-username/housemeter/frontend:latest

   # Pull specific version
   docker pull ghcr.io/your-username/housemeter/backend:v1.0.0
   docker pull ghcr.io/your-username/housemeter/frontend:v1.0.0
   ```

### Image Tags

The workflow creates the following tags:

- `latest` - Latest commit on main/master branch
- `v1.0.0` - Semantic version tags
- `v1.0` - Major.minor version tags
- `main-abc123` - Branch-specific tags with commit SHA

### Workflow Permissions

The workflow requires the following permissions:

- `contents: read` - To checkout the repository
- `packages: write` - To push images to GitHub Container Registry

These permissions are automatically granted for public repositories. For private repositories, ensure the workflow has access to packages.

## Security

- All API endpoints require authentication via the `x-api-key` header
- Password is stored in session storage during the user session
- Database credentials should be kept secure
- Use strong passwords for both database and application access

## Troubleshooting

### Common Issues

1. **Database Connection Error**: Check your PostgreSQL credentials in the server `.env` file
2. **Authentication Failed**: Verify the `APP_PASSWORD` matches between frontend and backend
3. **Port Already in Use**: Change the `PORT` in the server `.env` file
4. **CORS Errors**: Ensure the frontend is running on the correct port and the API URL is correct

### Logs

- Backend logs are displayed in the terminal where you run `npm start` in the server directory
- Frontend errors can be viewed in the browser's developer console

## License

MIT License
