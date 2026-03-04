import { readFile } from "fs/promises";
import type { Members } from "../Types";

export const GetAssignments = async () => {
    try{
        const members = await readFile("./src/database/members.json", 'utf-8')
        const data: Members[] = JSON.parse(members);

        return data;
    }
    catch{
        const error = "Error receiving assignments"
        return error;
    }
}