import { readFile } from "fs/promises";
import type { Assignments } from "../Types";

export const GetAssignments = async () => {
    try{
        const assignments = await readFile("./src/database/assignments.json", 'utf-8')
        const data: Assignments[] = JSON.parse(assignments);

        return data;
    }
    catch(error){
        console.log(error);
    }
}