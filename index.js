import express from "express";
import cors from "cors"
import "dotenv/config"
import { MongoClient, ObjectId } from 'mongodb';



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
const bookingCollection = db.collection("booking")

app.get("/", (req, res) =>{
    res.send("Server Home Page!")
})


// Studio Data
app.post('/studio', async (req, res) => {
    const data = req.body; 
    const result = await studioCollection.insertOne(data);
    console.log(result);
    res.send(result);
})
app.get('/studio', async (req, res) => {
    const result = await studioCollection.find().toArray();
    res.send(result)
})

// Studio ID API and Email API
app.get('/studio/:id', async (req, res) => {
    const { id } = req.params;
  if (ObjectId.isValid(id)) {
    const result = await studioCollection.findOne({ _id: new ObjectId(id) });
    return res.send(result);
  }
  const result = await studioCollection.find({ email: id }).toArray();
  res.send(result);
})
app.get('/my-listing/:email/:id', async (req, res) => {
    const { email, id } = req.params;
    const result = await studioCollection.findOne({ email: email, _id: new ObjectId(id) })
    res.send(result)
})


app.get('/studio-top-6', async( req, res)=>{
  const result = await studioCollection.find().sort({ rating: -1 }).limit(6).toArray()
    res.send(result)
})
// category api
app.get('/CTG-Photo-studio', async( req, res)=>{
  const result = await studioCollection.find({ category: "Photo Studio" }).toArray()
    res.send(result)
})
app.get('/CTG-Sound-Stage', async( req, res)=>{
  const result = await studioCollection.find({ category: "Sound Stage" }).toArray()
    res.send(result)
})
app.get('/CTG-Podcast-Room', async( req, res)=>{
  const result = await studioCollection.find({ category: "Podcast Room" }).toArray()
    res.send(result)
})
app.get('/CTG-Music-Suite', async( req, res)=>{
  const result = await studioCollection.find({ category: "Music Suite" }).toArray()
    res.send(result)
})
app.get('/CTG-Art-Workshop', async( req, res)=>{
  const result = await studioCollection.find({ category: "Art Workshop" }).toArray()
    res.send(result)
})
//User Booking Data add
app.post('/booking', async (req, res) => {
    const { _id, ...data } = req.body;   
    const result = await bookingCollection.insertOne(data)
    res.send(result)
})
//User Booking Api
app.get('/my-bookings/:email', async (req, res) => {
    const { email } = req.params
    const result = await bookingCollection.find({ email: email }).toArray();
    res.send(result)
})
app.get('/my-bookings/:email/:id', async (req, res) => {
    const { email, id } = req.params;
    const result = await bookingCollection.findOne({ email: email, _id: new ObjectId(id) })
    res.send(result)
})

app.listen(PORT, () => {
    console.log(`Server is runnign on port ${PORT}`);    
})