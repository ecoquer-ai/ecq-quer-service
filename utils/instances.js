const axios = require("axios");
require("dotenv").config();

const openAi = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    "OpenAI-Beta": "assistants=v1",
  },
  maxBodyLength: Infinity,
});

const parks = axios.create({
  baseURL: `${process.env.ECQ_PARKS_SERVICE}`,
});

const nutritionService = axios.create({
  baseURL: process.env.ECQ_NUTRITION_SERVICE,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

console.log("Instancia de Axios creada");

module.exports = { openAi, parks, nutritionService };
