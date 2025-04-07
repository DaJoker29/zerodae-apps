import Temps from "../models/temps.mjs";
import { schedule } from "node-cron";

const saveTemp = async function (req, res, next) {
  saveWeatherData(req.params.zip);
  res.status(200);
  res.send("New temperature saved");
};

const fetchCurrent = async function (req, res, next) {
  const current = await Temps.find({}).sort({ "body.data.time": -1 }).limit(1);
  res.json(current[0]);
};

const fetchRecent = async function (req, res, next) {
  const recents = await Temps.find({}).sort({ "body.data.time": -1 }).limit(20);
  res.json(recents);
};

const fetchAll = async function (req, res, next) {
  const temps = await Temps.find({});
  res.json(temps);
};

export default { saveTemp, fetchCurrent, fetchRecent, fetchAll };

async function saveWeatherData(zip) {
  try {
    const url = `https://api.tomorrow.io/v4/weather/realtime/?location=${zip}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        apikey: process.env.TOMORROW_API_KEY,
      },
    };

    const response = await fetch(url, options);

    if (response.ok) {
      const body = await response.json();
      await Temps.create({ zip, body });
    }
  } catch (err) {
    console.error(`Something went wrong fetching weather data: ${err}`);
  }
}

schedule("*/10 * * * *", () => {
  saveWeatherData(process.env.WEATHER_ZIP_CODE);
});
