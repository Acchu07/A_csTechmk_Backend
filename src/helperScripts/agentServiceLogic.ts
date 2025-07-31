import { Agent, Task } from "../types.ts";
import { agentAmount } from "../db/dbOperations.ts";

export function calculateTaskDistribution(agent: Agent[],result: Array<Task>){

    let i = 0
    for(const task of result){
        // Need to rethink what if there are more than 5 agents it means i will have to retrieve task from every agent to prevent duplicates being allocated.
        // Seperate tasks collection? With uniqueIDs?
        // if(isDuplicateTask(agent[i%agentAmount].tasks, task)) continue;
        agent[i%agentAmount].tasks.push(task); 
        i++;
    }
    return agent;
}

// Will break if property order breaks - Change this to unique ID for tasks or remove entirely - Come back later
function isDuplicateTask(tasks: Array<Task>, task: Task) {
    const taskToCheck = JSON.stringify(task);
    return tasks.some(t => JSON.stringify(t) === taskToCheck);
}