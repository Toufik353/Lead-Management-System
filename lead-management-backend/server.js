require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/leads", require("./routes/leadRoute"))

app.use("/api/callbacks", require("./routes/callbackRoute"));


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
