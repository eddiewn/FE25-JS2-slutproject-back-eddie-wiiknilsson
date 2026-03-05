import { readFile } from "fs/promises";
import type { Members } from "../Types";

export const GetMembers = async () => {
    try{
        const members = await readFile("./src/database/members.json", 'utf-8')
        const data: Members[] = JSON.parse(members);

        return data;
    }
    catch{
        const error = "Error receiving members"
        return error;
    }
}