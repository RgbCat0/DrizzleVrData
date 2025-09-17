import { exit } from "process";
import { db } from "./db.js";
import { users } from "./schema.js";
let scriptDone = false;
async function main() {
  // insert a row
  await db.insert(users).values({ name: "Jesper", meow: "Meow!" });

  // fetch rows
  const result = await db.select().from(users);
  console.log(result);
    scriptDone = true;
    // wait for user input (without pressing enter) to exit
    console.log("Press any key to exit...");
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on("data", () => {
        if (scriptDone) {
            exit(0);
        }
    });
}

main().catch(console.error);
