import express from "express";
import axios from "axios";

import cors from "cors";
import { selectParserFunction } from "./utils/scraper_parsers.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3030;

app.get("/", (req, res) => {
  res.send("Hello");
});
app.post("/scrape", (req, res) => {
  const ulr_to_scrape = req.body.url_to_scrape;

  axios
    .get(ulr_to_scrape)
    .then((response) => {
      const html = response.data;
      const res_object_to_send = selectParserFunction({
        url: ulr_to_scrape,
        html,
      });

      res.send(res_object_to_send);
    })
    .catch((error) => {
      console.log(error, "error from catch");
      res.send(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
