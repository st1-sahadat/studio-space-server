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
const studioCollection = db.collection("studio")

app.get("/", (req, res) =>{
    res.send("Server Home Page!")
})


// Studio Data
app.post('/add-studio', async (req, res) => {
    const data = req.body; 
    const result = await studioCollection.insertOne(data);
    console.log(result);
    res.send(result);
})
app.get('/add-studio', async (req, res) => {
    const result = await studioCollection.find().toArray();
    res.send(result)
})




app.get('/add-studio/:id', async (req, res) => {
    const { id } = req.params;
    const result = await studioCollection.findOne({ _id: new ObjectId(id) })
    res.send(result)
})


app.listen(PORT, () => {
    console.log(`Server is runnign on port ${PORT}`);    
})