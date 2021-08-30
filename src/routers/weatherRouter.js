const axios = require("axios");
const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("../db/Middleware/Auth");
const routerWeather = new express.Router();
const History = require("../models/historyModel");
const secret_key = "secret_this_should_be_longer";
const ROOT_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "675c51d119efd53840c834467fc005a4";

routerWeather.get("/showweathers",auth,async (req, res) => {
  const { cityName, token } = req.query;
  const tokenAuth = jwt.verify(token, secret_key);
  const url = ROOT_URL + `?q=${cityName}&APPID=${API_KEY}`;
  try {
      const response = await axios.get(`${url}`);
      const fetchCityData = response.data;
      if (tokenAuth.email) {
        const addHistory = await new History({
          email: tokenAuth.email,
          city: cityName,
          time: new Date().toTimeString(),
          date: new Date(),
        });
        await addHistory.save();
      }

      res.status(200).json(fetchCityData);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

routerWeather.get("/showweatherbycordinate",auth, async (req, res) => {
  try {
    const { latitude, longitude, token } = req.query;
    const tokenAuth = jwt.verify(token, secret_key);
    const url =
      ROOT_URL +
      `?lat=${latitude}&lon=${longitude}&exclude={part}&APPID=${API_KEY}`;
      const response = await axios.get(`${url}`);
      res.send(response.data);
  } catch (error) {
    console.log(error.response.data);
  }
});

routerWeather.get("/showcitysearchhistory",auth, async (req, res) => {
  try {
    const { token } = req.query;
    const tokenAuth = jwt.verify(token, secret_key);
    if (tokenAuth) {
      const allHistoryData = await History.find({
        email: tokenAuth.email,
      }).sort({
        date: "desc",
      });
      res.send(allHistoryData);
    }
  } catch (e) {
    res.status(404).send(e);
  }
});
module.exports = routerWeather;
