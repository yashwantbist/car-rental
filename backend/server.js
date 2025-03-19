const express = require("express");
const cors = require("cors");

const db = require("./mysql");

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON data

const PORT = 5000;



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



//sample routr to get car component to sql database
app.get("/cars", (req, res) => {
  db.query("SELECT * FROM cars", (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result); // Send data as JSON response
  });
});
//sample route to get reviews for cars
app.get("/reviews", (req, res) => {
  db.query("SELECT * FROM reviews", (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result); // Send data as JSON response
  });
});


// Signup Route
app.post("/signup", (req, res) => {
  const { full_name, email, password_hash, phone, address } = req.body;

  if (!full_name || !email || !password_hash || !phone || !address) {
    return res.status(400).send("All fields are required.");
  }

  const query = "INSERT INTO users (full_name, email, password_hash, phone, address) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [full_name, email, password_hash, phone, address], (err, result) => {
    if (err) {
      console.error("Insert query error:", err);
      return res.status(500).send("Error signing up");
    }
    res.status(200).send("Signup successful");
  });
});


// Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare password with password_hash column
    if (password !== results[0].password_hash) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res.json({ message: "Login successful", userId: results[0].user_id });
  });
});
//payment form page
//post for payment page
app.post("/payment", (req, res) => {
  const { name, address, email, cardType, cardNumber, expDate, cvv } = req.body;

  if (!name || !address || !email || !cardType || !cardNumber || !expDate || !cvv) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const query = "INSERT INTO payments (name, address, email, cardType, cardNumber, expDate, cvv) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(query, [name, address, email, cardType, cardNumber, expDate, cvv], (err, result) => {
    if (err) {
      console.error("Error inserting payment:", err);
      return res.status(500).json({ message: "Payment failed." });
    }
    res.json({ message: "Payment successful!", paymentId: result.insertId });
  });
});

//get payment form
app.get("/payments", (req, res) => {
  db.query("SELECT * FROM payments", (err, results) => {
    if (err) {
      console.error("Error fetching payments:", err);
      return res.status(500).json({ message: "Failed to retrieve payments." });
    }
    res.json(results);
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


