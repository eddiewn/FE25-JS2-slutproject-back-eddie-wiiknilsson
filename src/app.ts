import express from "express";
import cors from "cors";
import {GetAssignments} from "./AssignmentController/GetAssignments.ts";
import {AddAssignments} from "./AssignmentController/AddAssignments.ts";
import {GetMembers} from "./MemberController/GetMembers.ts";
import {AddMember} from "./MemberController/AddMember.ts";
// import AddMember
// import { Assignments } from "./Types.ts";
import {v4 as uuidv4} from "uuid";
import {DeleteAssignments} from "./AssignmentController/DeleteAssignments.ts";

export const app = express();
app.use(cors());
app.use(express.json());

app.get("/getAssignments", async (req, res) => {
    const assignments = await GetAssignments();
    res.json(assignments);
});

app.get("/getMembers", async (req, res) => {
    const members = await GetMembers();
    res.json(members);
});

app.post("/addAssignment", async (req, res) => {
    const {title, description, category} = await req.body;

    const assignments = await GetAssignments();

    if (Array.isArray(assignments)) {
        assignments.push({
            id: uuidv4(),
            title: title,
            description: description,
            category: category,
            status: "new",
            assignedto: null,
            timestamp: Date.now().toString(),
        });
        console.log(assignments);
        AddAssignments(assignments);
    }

    res.json("Successfully added assignment");
});

app.post("/addMember", async (req, res) => {
    const {name, category} = await req.body;
    const members = await GetMembers();

    console.log("I am here");

    if (Array.isArray(members)) {
        members.push({
            id: uuidv4(),
            name: name,
            category: category,
        });
    } else {
        res.json("Wrong adding member :(");
        return;
    }

    AddMember(members);
    res.json("Successfully added member");
});

app.delete("/deleteAssignment", async (req, res) => {
    const id = req.body.id;

    const assignments = await GetAssignments();
    const assignmentsIndex = assignments?.findIndex(
        (assignment) => assignment.id === id,
    );
    console.log(assignmentsIndex);

    if (assignments && assignmentsIndex !== -1) {
        assignments?.splice(assignmentsIndex!, 1);
    }

    if (assignments) {
        DeleteAssignments(assignments);
    }

    res.json(`Will attempt to remove with ID: ${id}`);
});

app.patch("/patchAssignment", async(req, res) => {
    const patchAssignment = req.body;
    const assignments = await GetAssignments();

    console.log(patchAssignment)

    const assignmentsIndex = assignments?.findIndex(
        (assignment) => assignment.id === patchAssignment.id,
    );

    if(assignments && assignmentsIndex !== undefined && assignmentsIndex !== -1){
        assignments[assignmentsIndex] = patchAssignment;
        AddAssignments(assignments);
    }

    res.json(`Attempting to patch ${patchAssignment.id}`)
})
