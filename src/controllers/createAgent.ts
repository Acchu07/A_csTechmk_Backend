import type {Request, Response} from "express";
import { checkAgentEmailPresent, dbCreateAgent } from "../db/dbOperations.ts";
import bcrypt from "bcryptjs";

export async function createAgent(req: Request, res: Response) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const agentToCreate = {...req.body};
    agentToCreate.password = hash;
   if(res.locals.user.role !== "admin"){
    return res.status(401).json({ message: "Unauthorized" });
   }
   const agentPresent = await checkAgentEmailPresent(req.body.email);
   if(agentPresent !== null){
    return res.status(409).json({ message: "Agent Already Present" });
   }

    const agentCreated = await dbCreateAgent(agentToCreate);
    if(!agentCreated){
     return res.status(500).json({ message: "Agent Not Created" });
    }
    res.status(200).json({ message: "Agent Created" });
}


// Refactor Make Code Cleaner 