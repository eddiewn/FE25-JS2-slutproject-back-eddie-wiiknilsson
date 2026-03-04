import express from "express";
import cors from "cors"
import { GetAssignments } from "./AssignmentController/GetAssignments.ts";
import { AddAssignments } from "./AssignmentController/AddAssignments.ts";
import { v4 as uuidv4 } from 'uuid';

export const app = express();
app.use(cors())
app.use(express.json())

app.get("/", async(req, res) => {
    const assignments = await GetAssignments();
    res.json(assignments);
})

app.post("/addAssignment", async(req, res) => {
    const { title, description, category } = await req.body;

    const assignments = await GetAssignments();

    if(Array.isArray(assignments))

    assignments.push({
        id: uuidv4(),
        title: title,
        description: description,
        category: category,
        status: "new",
        assignedto: null,
        timestamp: Date.now().toString()
    })
    console.log(assignments)



    res.json("yup i got it")
})