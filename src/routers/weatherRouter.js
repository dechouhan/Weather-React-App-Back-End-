const axios = require("axios");
const express = require("express");
const routerWeather = new express.Router();
const History = require("../models/historyModel");

const ROOT_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "675c51d119efd53840c834467fc005a4";

routerWeather.get("/showweathers", async (req, res) => {
  const { cityName, email } = req.query;
  const url = ROOT_URL + `?q=${cityName}&APPID=${API_KEY}`;
  try {
    const response = await axios.get(`${url}`);
    const fetchCityData = response.data;
    if (email) {
      const addHistory = await new History({
        email: email,
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

routerWeather.get("/showweatherbycordinate", async (req, res) => {
  const { latitude, longitude } = req.query;
  const url =
    ROOT_URL +
    `?lat=${latitude}&lon=${longitude}&exclude={part}&APPID=${API_KEY}`;
  try {
    const response = await axios.get(`${url}`);
    res.send(response.data);
  } catch (error) {
    console.log(error.response.data);
  }
});

routerWeather.get("/showcitysearchhistory", async (req, res) => {
  try {
    const allHistoryData = await History.find({ email: req.query.email }).sort({
      date: "desc",
    });
    res.send(allHistoryData);
  } catch (e) {
    res.status(404).send(e);
  }
});
module.exports = routerWeather;
