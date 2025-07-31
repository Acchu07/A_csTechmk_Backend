import { dbRetrieveAgents, dbUpdateAgents } from "../db/dbOperations.ts";
import { calculateTaskDistribution } from "../helperScripts/agentServiceLogic.ts";
import promiseBasedCSVparser from "../helperScripts/promiseBasedCSVparser.ts";
import type { Request, Response } from "express";
import fsPromises from "fs/promises";

export const uploadCSVTaskAlloc = async (req: Request, res: Response) => {
    const [result, agents] = await Promise.all([
      promiseBasedCSVparser(req),
      dbRetrieveAgents(),
    ]);
    const agentsWithTasks = calculateTaskDistribution(agents,result);
    await dbUpdateAgents(agentsWithTasks);
   res.status(200).json({ message: "Agents Updated", agentsWithTasks });
   req.file && await fsPromises.unlink(req.file.path);
};
  
  // Data in csv can still be different a way to confirm csv and then only push to db
  // Separate The agents from the list? - Get back to this later
  
  // Note - Agent Logic relies on the amount to be 5. Logic will need to be changed if multiple admins. Maybe retrieval might impact logic?