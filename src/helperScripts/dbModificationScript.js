import { MongoClient } from "mongodb";

const agents = [
  {
    name: "John Doe",
    email: "john.doe@example.com",  
    mobile: 9876543210,
    password: "password123",
    countryCode: "+1",
    tasks:[]
  },
  {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    mobile: 9123456789,
    password: "password123",
    countryCode: "+1",
    tasks:[]
  },
  {
    name: "Alice Smith",
    email: "alice.smith@example.com",
    mobile: 9988776655,
    password: "password123",
    countryCode: "+1",
    tasks:[]
  },
  {
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    mobile: 5556667788,
    password: "password123",
    countryCode: "+1",
    tasks:[]
  },
  {
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    mobile: 7778889990,
    password: "password123",
    countryCode: "+1",
    tasks:[]
  },
];

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db(process.env.DB);
const collection = db.collection("agents");

async function createManyAgents(){
    try {
        await collection.insertMany(agents);
        console.log("Agents inserted successfully");
    } catch (error) {
        console.error("Error inserting agents:", error);
    } finally {
        await client.close();
    }
}

async function deleteManyAgents(){
  try {
    await collection.deleteMany({"countryCode":"+1"});
    console.log("Agents deleted successfully");
} catch (error) {
    console.error("Error inserting agents:", error);
} finally {
    await client.close();
}
}

createManyAgents();
// deleteManyAgents()