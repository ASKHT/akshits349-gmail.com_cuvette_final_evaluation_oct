import dotenv from "dotenv/config";
import connectDB from "./db/connectDb.js";
import app from "./app.js";

const port = process.env.PORT || 8000;



connectDB()
    .then(() => {
        console.log("Database connected");
        app.listen(port, () => {
            console.log(`Server running at port ${port}`);
        });
    })
    .catch((error) => console.log(error));
