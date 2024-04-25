import * as mongodb from "mongodb";
import { Task } from "./task";

export const collections: {
    tasks?: mongodb.Collection<Task>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("meanStackExample");
    await applySchemaValidation(db);

    const tasksCollection = db.collection<Task>("tasks");
    collections.tasks = tasksCollection;
}

async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "priority", "level"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                priority: {
                    bsonType: "string",
                    description: "'priority' is required and is a string",
                    minLength: 1
                },
                level: {
                    bsonType: "string",
                    description: "'level' is required and is one of 'low', 'medium', or 'high'",
                    enum: ["low", "medium", "high"],
                },
            },
        },
    };

   await db.command({
        collMod: "tasks",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("tasks", {validator: jsonSchema});
        }
    });
}