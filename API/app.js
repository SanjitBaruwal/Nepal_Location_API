import express from "express";
import cors from "cors";
import apiRouter from "./Router/apiRouter.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["https://nepal-location-api-client.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("hello from nepal location server :)");
});
app.use("/api/v1/address", apiRouter);

export default app;
