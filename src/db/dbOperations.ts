import { accessDB } from "./mongodbConnect.ts";

type admin = {
  email: string;
  password: string;
  role: string;
}

export async function checkAdminPresent(email: string): Promise<admin | null> {
  const db = accessDB();
  if (!db) return null;
  return await db.collection<admin>("admin").findOne({ email });
}
