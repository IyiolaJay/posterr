import "dotenv/config"
import express from "express";
import cors from "cors";
import { err404NotFound } from "./errors/middlewares/error.js";
import authRoutes from "./post-api/routes/auth.js";
import categoryRoutes from "./post-api/routes/category.js";
import socialAuthRoutes from "./post-api/routes/auth.social.js"
import { InitializePassport } from "./post-api/middlewares/social-auth/auth.social.js";

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.get("/", async (_, res)=>{

    return res.status(200).json({
        message : "Posterr API-@v1 is live and running"
    });
})

//setup passport middleware 
InitializePassport(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

// Authentication routes
app.use("/api/v1", socialAuthRoutes);
app.use("/api/v1", authRoutes);

//Category routes
app.use("/api/v1", categoryRoutes);

//404 middleware for routes that are not found on the server...
app.use(err404NotFound)

export default app;