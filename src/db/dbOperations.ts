import { admin, Agent } from "../types.ts";
import { accessDB } from "./mongodbConnect.ts";

export const agentAmount = 5;

export async function checkAdminEmailPresent(email: string): Promise<admin | null> {
  const db = accessDB();
  if (!db) throw new Error("DB not connected");
  return await db.collection<admin>("admin").findOne({ email });
}

export async function checkAgentEmailPresent(email: string): Promise<Agent | null> {
  const db = accessDB();
  if (!db) throw new Error("DB not connected");
  return await db.collection<Agent>("agents").findOne({ email });
}


export async function dbCreateAgent(agent: Agent): Promise<boolean> {
  const db = accessDB();
  if (!db) throw new Error("DB not connected");
  const result = await db.collection<Agent>("agents").insertOne(agent);
  return result.acknowledged;
}

export async function dbRetrieveAgents(): Promise<Array<Agent>> {
  const db = accessDB();
  if (!db) throw new Error("DB not connected");
  return await db.collection<Agent>("agents").find().limit(agentAmount).toArray();
}

export async function dbUpdateAgents(agents: Agent[]): Promise<boolean> {
  const db = accessDB();
  if (!db) throw new Error("DB not connected");
  const bulkOps = agents.map(agent => ({
    updateOne: {
      filter: { _id: agent._id },
      update: { $set: { tasks: agent.tasks } }
    }
  }));
  const result = await db.collection<Agent>("agents").bulkWrite(bulkOps);
  return result.matchedCount===result.modifiedCount;
}