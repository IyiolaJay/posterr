import "dotenv/config"
import express from "express";
import cors from "cors";
import { err404NotFound } from "./errors/middlewares/error";


const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.get("/", async (_, res)=>{

    return res.status(200).json({
        message : "Posterr API-@v2 is live and running"
    });
})


// app.use("/api/v1");

//404 middleware for routes that are not found on the server...
app.use(err404NotFound)

export default app;