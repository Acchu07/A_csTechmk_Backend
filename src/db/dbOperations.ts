import { accessDB } from "./mongodbConnect.ts";

type Agent = {
  email: string;
  password: string;
  role: string;
  name: string;
  mobile: number;
  countryCode: string;
}

type admin = { 
  email: string;
  password: string;
  role: string;
}

export async function checkAdminEmailPresent(email: string): Promise<admin | null> {
  const db = accessDB();
  if (!db) return null;
  return await db.collection<admin>("admin").findOne({ email });
}

export async function checkAgentEmailPresent(email: string): Promise<Agent | null> {
  const db = accessDB();
  if (!db) return null;
  return await db.collection<Agent>("agents").findOne({ email });
}


export async function dbCreateAgent(agent: Agent): Promise<boolean> {
  const db = accessDB();
  if (!db) return false;
  const result = await db.collection<Agent>("agents").insertOne(agent);
  return result.acknowledged;
}