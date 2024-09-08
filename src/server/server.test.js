const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
let projectData = {};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("dist"));

app.get("/all", (req, res) => {
  res.send(projectData);
});

app.post("/add", (req, res) => {
  projectData = req.body;
  res.send(projectData);
});

describe("Express Server", () => {
  beforeEach(() => {
    // Reset projectData before each test
    projectData = {};
  });

  it("should respond with an empty object on GET /all", async () => {
    const response = await request(app).get("/all");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({});
  });

  it("should respond with posted data on POST /add", async () => {
    const data = {
      location: "London",
      date: "2024-08-29",
      temp: 20,
      weather: "Sunny",
    };
    const response = await request(app).post("/add").send(data);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(data);
  });

  it("should handle missing or invalid data on POST /add", async () => {
    const response = await request(app).post("/add").send({});
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({}); // or however you handle invalid data
  });
});
