import fs from "fs";
import csv from "csv-parser";
import type { Request } from "express";
import type {Task} from "../types.ts";

export default async function promiseBasedCSVparser(req: Request): Promise<Array<Task>> {
  return new Promise((resolve, reject) => {
    if (req.file === undefined) return;
    let results: Array<Task> = [];
    fs.createReadStream(req.file.path)
      .pipe(
        csv({
          mapHeaders: ({ header }) => header.toLowerCase(),
          mapValues: ({ header, index, value }) =>
            index === 1 ? Number(value) : value.toLowerCase(),
        })
      )
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}
