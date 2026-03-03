import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/ecofinds";
const options = {};

let client;
let clientPromise;

if (!process.env.MONGO_URI) {
    console.warn("Please add your Mongo URI to .env.local. Falling back to localhost.");
}

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export async function getDb() {
    const client = await clientPromise;
    return client.db("ecofinds");
}
