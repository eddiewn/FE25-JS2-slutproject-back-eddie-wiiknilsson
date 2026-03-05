// import { readFile } from "fs/promises";
import fs from "fs";
import type { Members } from "../Types";

export const AddMember = async (newMembers: Members[]) => {
    try {
        // const assignments = await readFile("./src/database/assignments.json", 'utf-8')
        // const data: Assignments[] = JSON.parse(assignments);

        fs.writeFile(
            "./src/database/members.json",
            JSON.stringify(newMembers),
            (error) => {
                if (error) {
                    console.log("Error writing file:", error);
                    return;
                }
                console.log("adding member successfull i do believe.");
            },
        );
    } catch {
        const error = "Error adding assignment";
        return error;
    }
};
