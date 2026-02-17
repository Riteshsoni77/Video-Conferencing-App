import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";
import mongoose  from "mongoose";

import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";


const app =express();
const server=createServer(app);
const io = connectToSocket(server);



app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.get("/abc",(req,res)=>{
    return res.json({"hellow":"world"});
});


const start=async()=>{
 app.set("mongo_user")
    const connectionDb = await mongoose.connect("mongodb+srv://riteshsoni1138_db_user:xImM60hyDQm2zrM2@cluster0.fuhqzg3.mongodb.net/?appName=Cluster0");
     console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)
    server.listen(app.get("port"),()=>{
        console.log ( `LISTENING ON PORT 8000`);
    });

}

start();

