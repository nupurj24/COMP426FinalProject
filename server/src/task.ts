import * as mongodb from "mongodb";

export interface Task {
    name: string;
    description: string;
    level: "low" | "medium" | "high";
    _id?: mongodb.ObjectId;
}