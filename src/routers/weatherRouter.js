const axios = require("axios");
const express = require("express");
const routerWeather = new express.Router();
const https = require("https");
const History = require("../models/historyModel");
routerWeather.get("/showweather", async (req, res) => {
      try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${req.query.cityName}&APPID=675c51d119efd53840c834467fc005a4`
        );
        //console.log(response.data);
        // const addSearchCityHistory =await new History({
        //     email:req.query.email
        // })
        // addSearchCityHistory.save()
        res.send(response.data)
      } catch (error) {
        console.log(error.response.data);
      }
    })

module.exports = routerWeather;
