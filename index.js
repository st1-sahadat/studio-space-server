import express from "express";
import cors from "cors"
import "dotenv/config"
import { MongoClient } from 'mongodb';



const PORT = 5000;
const app = express();
app.use(cors());
app.use(express.json());


const client = new MongoClient(process.env.MONGO_URI);
export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
const mongoClient = await connectToMongoDB();
const db = mongoClient.db("studio-space")
const studiospaceCollection = db.collection("studio-space-server")

app.get("/", (req, res) =>{
    res.send("Server Home Page!")
})



app.listen(PORT, () => {
    console.log(`Server is runnign on port ${PORT}`);    
})