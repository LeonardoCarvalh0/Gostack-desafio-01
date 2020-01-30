const express = require("express");
const app = express();

app.use(express.json());

function CheckId(req, res, next) {
  const { id } = req.params;
  const index = projects.findIndex(item => item.id === id);
  if (index < 0) {
    return res.status(400).json({ error: "Id does not exist" });
  }
  return next();
}

app.use((req, res, next) => {
  console.count("Count:");
  return next();
});

const projects = [];

app.post("/projects", (req, res) => {
  const { id, title } = req.body;
  projects.push({ id, title, tasks: [] });
  return res.json(projects);
});

app.get("/projects", (req, res) => {
  return res.json(projects);
});

app.put("/projects/:id", CheckId, (req, res) => {
  const id = req.params.id;
  const { title } = req.body;
  const project = projects.find(item => item.id === id);
  project.title = title;
  return res.json(project);
});

app.delete("/projects/:id", CheckId, (req, res) => {
  const { id } = req.params;
  const project = projects.findIndex(item => item.id === id);
  projects.splice(project, 1);
  return res.json({ message: "successful" });
});

app.post("/projects/:id/tasks", CheckId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(item => item.id === id);
  project.tasks.push(title);
  return res.json(projects);
});

app.listen(3000);
