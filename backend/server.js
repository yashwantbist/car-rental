require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const db = require("./mysql");
const http = require("http");
const { Server } = require("socket.io");
const router = express.Router();


const app = express();
const server = http.createServer(app); 

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/",router)
app.use("/uploads", express.static("uploads"));

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });





// --- CAR RENTAL LISTINGS ---
app.get("/cars", async (req, res) => {
  try {
    const [results] = await db.promise().query("SELECT * FROM rental_listings");
    res.json(results);
  } catch (err) {
    console.error("Fetch cars error:", err);
    res.status(500).json({ error: "Failed to fetch listings." });
  }
});

app.post("/cars", upload.single("image"), async (req, res) => {
  const {
    name, rentalTerms, carDetails, phone, address, makeModel, yearOfManufacture, vin, mileage,
    transmission, color, fuelType, rentalPrice, securityDeposit, insuranceCoverage,
    paymentMethods, latefee, pickupLocation, fuelPolicy
  } = req.body;

  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = `INSERT INTO rental_listings 
    (name, image, rental_terms, car_details, phone, address, make_model, year_of_manufacture, vin,
     mileage, transmission, color, fuel_type, rental_price, security_deposit, insurance_coverage,
     payment_methods, late_fee, pickup_location, fuel_policy) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    const [result] = await db.promise().query(sql, [
      name, image, rentalTerms, carDetails, phone, address, makeModel, yearOfManufacture, vin,
      mileage, transmission, color, fuelType, rentalPrice, securityDeposit, insuranceCoverage,
      paymentMethods, latefee, pickupLocation, fuelPolicy
    ]);
    res.json({ message: "Rental listing added!", id: result.insertId });
  } catch (err) {
    console.error("Insert listing error:", err);
    res.status(500).json({ error: "Failed to add listing." });
  }
});


// --- PAYMENTS ---
app.post("/payments", async (req, res) => {
  const { name, address, email, cardType, cardNumber, expDate, cvv } = req.body;

  if (!name || !address || !email || !cardType || !cardNumber || !expDate || !cvv) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const query = `INSERT INTO payments (name, address, email, cardType, cardNumber, expDate, cvv) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await db.promise().query(query, [name, address, email, cardType, cardNumber, expDate, cvv]);
    res.json({ message: "Payment successful!", paymentId: result.insertId });
  } catch (err) {
    console.error("Payment error:", err);
    res.status(500).json({ message: "Payment failed." });
  }
});

app.get("/payments", async (req, res) => {
  try {
    const [results] = await db.promise().query("SELECT * FROM payments");
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve payments." });
  }
});
// SIGNUP - Register a New User
router.post("/signup", async (req, res) => {
  const { full_name, email, password, phone, address } = req.body;

  if (!full_name || !email || !password || !phone || !address) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Check if email already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length > 0) {
        return res.status(400).json({ error: "Email already registered." });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into database
      const query = "INSERT INTO users (full_name, email, password_hash, phone, address) VALUES (?, ?, ?, ?, ?)";
      db.query(query, [full_name, email, hashedPassword, phone, address], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({ message: "User registered successfully" });
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// LOGIN - Authenticate User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Server error, please try again later." });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const user = results[0];

      // Check if the password column name matches your database (e.g., password_hash or just password)
      if (!user.password_hash) {
        console.error("Password column mismatch. Check your database structure.");
        return res.status(500).json({ error: "Internal error, please contact support." });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      res.json({ message: "Login successful", userId: user.user_id });
    });
  } catch (error) {
    console.error("Unexpected server error:", error);
    res.status(500).json({ error: "Unexpected error, please try again later." });
  }
});

// Route to get user profile by user_id
app.get("/profile/:user_id", (req, res) => {
  const userId = req.params.user_id;

  db.query("SELECT * FROM users WHERE user_id = ?", [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result[0]);
  });
});

// Route to update user profile
app.put("/profile/:user_id", (req, res) => {
  const userId = req.params.user_id;
  const { full_name, email, phone, address, profile_picture } = req.body;

  const updateQuery =
    "UPDATE users SET full_name = ?, email = ?, phone = ?, address = ?, profile_picture = ? WHERE user_id = ?";
  db.query(
    updateQuery,
    [full_name, email, phone, address, profile_picture, userId],
    (err, updateResult) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      // After updating, fetch the updated user data
      db.query(
        "SELECT * FROM users WHERE user_id = ?",
        [userId],
        (err, selectResult) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          if (selectResult.length === 0) {
            return res.status(404).json({ error: "User not found" });
          }
          res.json(selectResult[0]); // Return the updated user data
        }
      );
    }
  );
});

// Route to delete user profile
app.delete("/profile/:user_id", (req, res) => {
  const userId = req.params.user_id;

  db.query("DELETE FROM users WHERE user_id = ?", [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  });
});




// --- CHAT SOCKET.IO INTEGRATION ---
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('joinRoom', (user_id) => {
    socket.join(`user_${user_id}`);
  });

  socket.on('sendMessage', async ({ sender_id, receiver_id, message, reply_to }) => {
    try {
      const [result] = await db.promise().query(
        "INSERT INTO messages (sender_id, receiver_id, message, reply_to) VALUES (?, ?, ?, ?)",
        [sender_id, receiver_id, message, reply_to || null]
      );

      const newMessage = {
        id: result.insertId,
        sender_id,
        receiver_id,
        message,
        created_at: new Date(),
        delivered: false,
        seen: false,
        reply_to
      };

      io.to(`user_${receiver_id}`).emit('receiveMessage', newMessage);
    } catch (error) {
      console.error("Database Error:", error);
    }
  });

  socket.on('messageDelivered', async (message_id) => {
    await db.promise().query("UPDATE messages SET delivered = TRUE WHERE id = ?", [message_id]);
  });

  socket.on('messageSeen', async (message_id) => {
    await db.promise().query("UPDATE messages SET seen = TRUE WHERE id = ?", [message_id]);
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

// --- API for Chat History ---
app.get('/messages/:user1/:user2', async (req, res) => {
  const { user1, user2 } = req.params;
  try {
    const [messages] = await db.promise().query(
      `SELECT * FROM messages 
       WHERE (sender_id = ? AND receiver_id = ?) 
       OR (sender_id = ? AND receiver_id = ?) 
       ORDER BY created_at`,
      [user1, user2, user2, user1]
    );
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Database Error" });
  }
});


// --- SERVER START ---
server.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
