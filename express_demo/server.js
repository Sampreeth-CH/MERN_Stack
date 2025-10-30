const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(express.json());

// the originAgentClusterl url that was copied is mongodb+srv://sampreethchsampreethch_db_user:vhL8XynsFcfTkRaW@sampreeth.9iyksjm.mongodb.net/ add the database  at the end like test.db
const mongoURI = "mongodb+srv://sampreethchsampreethch_db_user:vhL8XynsFcfTkRaW@sampreeth.9iyksjm.mongodb.net/test"

mongoose.connect(mongoURI).then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.error("Connection to mongoDB shows an error:");
})

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

const Item = mongoose.model('Item',itemSchema);
app.use(express.json());

app.post('/product',async(req,res)=>{
    try{
        const newItem=new Item(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    }catch(err){
        res.status(400).json({error: err.message})
    }
});

app.get('/product',async(req,res)=>{
    try{
        const items = await Item.find();
        res.status(200).json(items)
    }
    catch(err)
    {
        res.status(500).json({error: err.message})
    }
})


app.put('/product/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,    
            req.body,         
            { new: true }      
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


app.delete('/product/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({ message: "Item deleted successfully", deletedItem });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}/`)
});