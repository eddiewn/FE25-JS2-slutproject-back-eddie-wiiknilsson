// import { readFile } from "fs/promises";
import fs from "fs";
import type {Assignments} from "../Types";

export const AddAssignments = async (newAssignments: Assignments[]) => {
    try {

        fs.writeFile(
            "./src/database/assignments.json",
            JSON.stringify(newAssignments),
            (error) => {
                if (error) {
                    console.log("Error writing file:", error);
                    return;
                }
                console.log("File successfully rewritten!");
            },
        );
    } catch {
        const error = "Error adding assignment";
        return error;
    }
};
