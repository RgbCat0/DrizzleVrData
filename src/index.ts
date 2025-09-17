import { exit } from "process";
import { db } from "./db.js";
import { users } from "./schema.js";
let scriptDone = false;
async function main() {

    // let user enter name
    const name1 = await new Promise((resolve) => {
        process.stdin.once("data", (data) => {
            resolve(data.toString().trim());
        });
    });

    console.log(`Hello, ${name1}!`);
  // insert a row
  await db.insert(users).values({ name: `${name1}`, meow: "Meow!" });

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
