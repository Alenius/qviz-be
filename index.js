require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;

const queries = require("./db/queries");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/questions", async (request, response) => {
  console.log({ param: request.query.id });
  const questionId = request.query.id;
  const allQuestions = await queries.getQuestions(questionId);
  console.log({ allQuestions: allQuestions[0].questions });
  response.json({ questions: allQuestions });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
