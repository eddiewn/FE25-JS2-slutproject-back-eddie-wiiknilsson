import express from "express";
import cors from "cors"
import { GetAssignments } from "./AssignmentController/GetAssignments.ts";

export const app = express();
app.use(cors())
app.use(express.json())

app.get("/", async(req, res) => {
    const assignments = await GetAssignments();
    res.json(assignments);
})