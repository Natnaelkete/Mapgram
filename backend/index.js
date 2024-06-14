const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");
const cors = require("cors");
const {
  notFound,
  errorHandler,
  multerErrorHandler,
} = require("./middlewares/errorMiddleware");
// const uploadRoutes = require("./routes/uploadRoutes");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => console.log(err));

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);
// app.use("/api/upload", uploadRoutes);
app.use(notFound);
app.use(errorHandler);
app.use(multerErrorHandler);

// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
