import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import courseRoute from "./route/course.route.js";
import cartRoute from "./route/cart.route.js";

const app = express();

app.use(cors());
app.use(express.json());



const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// connect to mongoDB
const connectDB = async () => {
    try {
      await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    }
  };
connectDB();

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/course", courseRoute);
app.use("/user/cart", cartRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});