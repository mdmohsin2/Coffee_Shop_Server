const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

// middle wares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kjb9ctc.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });



async function run(){
    try{
        const itemCollection = client.db('coffeeShop').collection('menuItem');

        app.get('/items', async(req, res) =>{
            const query = {}
            const result = await itemCollection.find(query).toArray();
            res.send(result)
        })
    }
    finally{

    }
}
run().catch(console.log);


app.get('/', (req, res) => {
    res.send("Simple node server running")
});

app.listen(port, (req, res) => {
    console.log(`server runnint on  ${port}`);
})