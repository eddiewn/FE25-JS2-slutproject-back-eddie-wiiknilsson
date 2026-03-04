export type Members = {
    id: string;
    name: string;
    category: string;
}

export type Assignments = {
    id: string;
    title: string;
    description: string;
    category: string;
    status: string;
    assignedto: string | null;
    timestamp: string;
}