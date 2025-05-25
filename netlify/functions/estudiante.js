const serverless = require("serverless-http");
const express = require("express");
const app = express();
const estudianteRoutes = require("../../Backend/routes/estudiantesroutes");

app.use(express.json());
app.use("/estudiante", estudianteRoutes);

module.exports.handler = serverless(app);
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path} - Body:`, req.body);
  next();
});