type Agent = {
    _id?: string;
    email: string;
    password: string;
    role: string;
    name: string;
    mobile: number;
    countryCode: string;
    tasks: Array<Task>
  }
  
  type Task = {
    firstName: string;
    Phone: number;
    Notes: string;
  }
  
  type admin = { 
    email: string;
    password: string;
    role: string;
  }

  export type {Agent, Task, admin};