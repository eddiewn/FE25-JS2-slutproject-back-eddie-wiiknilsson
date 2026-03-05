import express from "express";
import cors from "cors"
import { GetAssignments } from "./AssignmentController/GetAssignments.ts";
import { AddAssignments } from "./AssignmentController/AddAssignments.ts";
import { GetMembers } from "./MemberController/GetMembers.ts";
import { AddMember } from "./MemberController/AddMember.ts"
// import AddMember
// import { Assignments } from "./Types.ts";
import { v4 as uuidv4 } from 'uuid';

export const app = express();
app.use(cors())
app.use(express.json())

app.get("/getAssignments", async(req, res) => {
    const assignments = await GetAssignments();
    res.json(assignments);
})

app.get("/getMembers", async (req, res) => {
    const members = await GetMembers();
    res.json(members);
})

app.post("/addAssignment", async(req, res) => {
    const { title, description, category } = await req.body;

    const assignments = await GetAssignments();

    if(Array.isArray(assignments)){

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
        AddAssignments(assignments)
    }

    res.json("Successfully added assignment")
})

app.post("/addMember", async(req, res) => {
    const { name, category } = await req.body;
    const members = await GetMembers();

    console.log("I am here")

    if(Array.isArray(members)){
        members.push({
            id: uuidv4(),
            name: name,
            category: category,
        })
    }else{
        res.json("Wrong adding member :(")
        return;
    }

    AddMember(members)
    res.json("Successfully added member")
})