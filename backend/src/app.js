const express = require("express");
const notemodel = require("./models/note.model")
const Cors = require("cors")
const app = express();


app.use(express.json());
app.use(Cors())
app.use(express.static("./public"))

// post API
app.post("/api/note", async (req, res) => {
    const { title, discription } = req.body
    const notes = await notemodel.create({
        title, discription
    })
    res.status(201).json({
        message: "note created",
        notes
    })
})

// get API
app.get("/api/note", async (req, res) => {
    const notes = await notemodel.find()
    res.status(200).json({
        message: "note fatched",
        notes
    })
})

// delete API
app.delete("/api/note/:id", async (req, res) => {
    const {id} = req.params
    await notemodel.findByIdAndDelete(id)
    res.status(200).json({
        message: "note delete sucessfully"
    })
})




// patch API
app.patch("/api/note/:id", async (req, res) => {
    const id = req.params.id
    const { title, discription } = req.body
    const updatenote = await notemodel.findByIdAndUpdate(id, { title, discription })
    res.status(200).json({
        message: "note updated",
        updatenote
    })
})

module.exports = app

