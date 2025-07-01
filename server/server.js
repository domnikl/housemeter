const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "x-api-key",
      "Authorization",
      "Origin",
      "Accept",
    ],
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(express.json());

// Database connection
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "housemeter",
  password: process.env.DB_PASSWORD || "password",
  port: process.env.DB_PORT || 5432,
});

// Initialize database table
async function initializeDatabase() {
  try {
    const client = await pool.connect();

    // Create measurements table
    await client.query(`
      CREATE TABLE IF NOT EXISTS measurements (
        id VARCHAR(255) PRIMARY KEY,
        date TIMESTAMP NOT NULL,
        value DECIMAL(10,2) NOT NULL,
        type VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    client.release();
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Database initialization error:", error);
  }
}

// Authentication middleware
function authenticatePassword(req, res, next) {
  const providedPassword = req.headers["x-api-key"];
  const expectedPassword = process.env.APP_PASSWORD;

  if (!expectedPassword) {
    return res.status(500).json({ error: "Password not configured" });
  }

  if (!providedPassword || providedPassword !== expectedPassword) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}

// API Routes
app.get("/api/health", authenticatePassword, (req, res) => {
  res.json({ status: "ok", message: "Housemeter API is running" });
});

// Get all measurements
app.get("/api/measurements", authenticatePassword, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, date, value, type FROM measurements ORDER BY date DESC"
    );

    const measurements = result.rows.map((row) => ({
      id: row.id,
      date: new Date(row.date),
      value: parseFloat(row.value),
      type: row.type,
    }));

    res.json(measurements);
  } catch (error) {
    console.error("Error fetching measurements:", error);
    res.status(500).json({ error: "Failed to fetch measurements" });
  }
});

// Add new measurement
app.post("/api/measurements", authenticatePassword, async (req, res) => {
  try {
    const { id, date, value, type } = req.body;

    if (!id || !date || value === undefined || !type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await pool.query(
      "INSERT INTO measurements (id, date, value, type) VALUES ($1, $2, $3, $4)",
      [id, new Date(date), value, type]
    );

    res.status(201).json({ message: "Measurement added successfully" });
  } catch (error) {
    console.error("Error adding measurement:", error);
    res.status(500).json({ error: "Failed to add measurement" });
  }
});

// Delete measurement
app.delete("/api/measurements/:id", authenticatePassword, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM measurements WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Measurement not found" });
    }

    res.json({ message: "Measurement deleted successfully" });
  } catch (error) {
    console.error("Error deleting measurement:", error);
    res.status(500).json({ error: "Failed to delete measurement" });
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initializeDatabase();
});
