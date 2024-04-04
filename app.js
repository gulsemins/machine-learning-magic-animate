const express = require("express");
const fal = require("@fal-ai/serverless-client");
const app = express();
const PORT = 888;

fal.config({
  credentials:
    "c8f437de-b906-4c4f-a6ad-51d010d2bfe8:e842f5d2a4496f60a330335d09fee560", // or a function that returns a string
});

app.use(express.static("./"));
app.use(express.json());

app.post("/api", async (req, res) => {
  const result = await fal.subscribe("fal-ai/magic-animate", {
    input: {
      image_url: req.body.url,
      motion_sequence_url:
        "https://storage.googleapis.com/falserverless/gallery/running2.mp4",
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_PROGRESS") {
        update.logs.map((log) => log.message).forEach(console.log);
      }
    },
  });
  res.json(result);
  console.log(result);
});

app.listen(PORT, () => {
  console.log("Server is run!");
});
