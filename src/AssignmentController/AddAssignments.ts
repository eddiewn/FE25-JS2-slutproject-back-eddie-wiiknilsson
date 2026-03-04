import { readFile } from "fs/promises";
import type { Assignments } from "../Types";

export const AddAssignments = async (newAssignments: Assignments) => {
    try{
        const assignments = await readFile("./src/database/assignments.json", 'utf-8')
        const data: Assignments[] = JSON.parse(assignments);

    }
    catch{
        const error = "Error receiving assignments"
        return error;
    }
}