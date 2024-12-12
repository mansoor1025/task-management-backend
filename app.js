require("dotenv").config();
const cors = require('cors');
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/tasks");


const app = express();
connectDB();
app.use(cors());
app.use(bodyParser.json());


app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
