const express = require("express");
const cors = require("cors");
const db = require("./mysql");

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON data

// Sample route to get all users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Sample route to add a user
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  db.query("INSERT INTO users (fullname, email) VALUES (?, ?)", [name, email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "User added", userId: result.insertId });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
