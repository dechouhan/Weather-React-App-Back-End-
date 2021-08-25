const axios = require("axios");
const express = require("express");
const routerWeather = new express.Router();
const History = require("../models/historyModel");

routerWeather.get("/showweather", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${req.query.cityName}&APPID=675c51d119efd53840c834467fc005a4`
    );
    res.send(response.data);
  } catch (error) {
    console.log(error.response.data);
  }
});

routerWeather.get("/showweatherbycordinate", async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude={part}&appid=675c51d119efd53840c834467fc005a4`
    );
    res.send(response.data);
  } catch (error) {
    console.log(error.response.data);
  }
});

module.exports = routerWeather;
