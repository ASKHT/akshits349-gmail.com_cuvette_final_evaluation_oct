import express from "express";
import morgan from "morgan";
import cors from "cors";
import authroute from "./routes/Auth.route.js"
import pollroute from "./routes/Poll.route.js"
import quizroute from "./routes/Quiz.route.js"
import userroute from "./routes/User.route.js"
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());


app.use("/api/v1/auth", authroute);
app.use("/api/v1/quiz",quizroute);
app.use("/api/v1/poll",pollroute);
app.use("/api/v1/user",userroute);

app.use(errorMiddleware)


export default app;