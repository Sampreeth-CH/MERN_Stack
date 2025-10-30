const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
.then(() => console.log("MongoDB successfully connected"))
.catch((err)=>console.error("MongoDB Connection is refused or .env file is not present:",err))


const taskSchema = new mongoose.Schema(
    {
        taskname:{type:String,required:true,trim:true},
        priority:{type:String,enum:['Low','Medium','High'],default: 'Medium'},
        completed: {type: Boolean, default: false}
    },
    {
        timestamps: true
    }
);

const Task = mongoose.model("Task", taskSchema);
app.use(express.static(path.join(__dirname, 'public')))
// Middleware for url extension
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.get('/api/tasks',async(req,res)=>{
    try{
        const tasks=await Task.find().sort({createdat:-1})
        res.status(200).json(tasks)
    }
    catch(err)
    {
        res.status(500).json({error: err.message})
    }
})


app.post('/api/tasks',async(req,res)=>{
    try{
        const newTask=new Task(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    }catch(err){
        res.status(400).json({error: err.message})
    }
});


app.put('/api/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,    
            req.body,         
            { new: true }      
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({ message: "Task deleted successfully", deletedTask });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})