if (process.env.NODE_ENV !== "production") {
  try { require("dotenv").config({ path: require("path").join(__dirname, ".env") }); } catch {}
}

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (process.env.NODE_ENV !== "production" && origin.startsWith("http://localhost")) return cb(null, true);
    if (ALLOWED_ORIGINS.length === 0 || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS"));
  }
}));

const PORT     = Number(process.env.PORT) || 3001; // Render/Railway la setean
const HOST     = process.env.HOST || "0.0.0.0";
const API_KEY  = process.env.COMICVINE_API_KEY;
const API_BASE = process.env.COMICVINE_API_BASE || "https://comicvine.gamespot.com/api";
const UA       = process.env.USER_AGENT || "comicvine-client";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "User-Agent": UA, Accept: "application/json" },
  timeout: 20_000
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.get("/api/characters", async (req, res) => {
  const { limit, offset = 0, filter, sort, field_list } = req.query;
  const params = { api_key: API_KEY, format: "json", limit, offset, filter, sort, field_list };

  try {
    const { data } = await api.get("/characters/", { params });
    res.json(data);
  } catch (err) {
    console.error("Error ComicVine (characters):", err?.response?.data || err.message);
    res.status(err?.response?.status || 500).json({
      error: "Error al consultar ComicVine (characters)",
      details: err?.response?.data || err.message
    });
  }
});

app.get("/api/character/:id", async (req, res) => {
  const { id } = req.params;
  const { field_list } = req.query;
  const params = { api_key: API_KEY, format: "json", field_list };

  try {
    const { data } = await api.get(`/character/${id}/`, { params });
    res.json(data);
  } catch (err) {
    console.error("Error ComicVine (character):", err?.response?.data || err.message);
    res.status(err?.response?.status || 500).json({
      error: "Error al consultar ComicVine Character",
      details: err?.response?.data || err.message
    });
  }
});

app.get("/api/issues", async (req, res) => {
  const {
    filter,
    sort = "store_date:desc",
    limit = 20,
    offset = 0,
    field_list
  } = req.query;

  const params = { api_key: API_KEY, format: "json", filter, sort, limit, offset, field_list };

  try {
    const { data } = await api.get("/issues/", { params });
    res.json(data);
  } catch (err) {
    console.error("Error ComicVine (issues):", err?.response?.data || err.message);
    res.status(err?.response?.status || 500).json({
      error: "Error al consultar ComicVine Issues",
      details: err?.response?.data || err.message
    });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Servidor proxy corriendo en http://${HOST}:${PORT}`);
});
