// import { exit } from "process";
// import { db } from "./db.js";
// import { users } from "./schema.js";
// import { eq } from "drizzle-orm";
// let scriptDone = false;
// async function main() {
// 	console.log("Welcome to the Drizzle ORM example script!");
// 	console.log(
// 		"Press 1 to list entries, 2 to add an entry, 3 to delete an entry, or any other key to exit."
// 	);
// 	await new Promise((resolve) => {
// 		process.stdin.once("data", async (data) => {
// 			const input = data.toString().trim();
// 			if (input === "1") {
// 				console.log("Listing entries...");
// 				const result = await db.select().from(users);
// 				console.log(result);
// 				resolve(true);
// 			} else if (input === "2") {
// 				console.log("Adding an entry...");
// 				await AddEntry();
// 				resolve(true);
// 			} else if (input === "3") {
// 				await DeleteEntry();
// 				resolve(true);
// 			} else {
// 				console.log("Exiting...");6
// 				scriptDone = true;
// 				exit(0);
// 			}
// 		});
// 	});
// 	// ask again
// 	if (!scriptDone) {
// 		main();
// 	} else {
// 		exit(0);
// 	}
// }
// async function AddEntry() {
// 	console.log("Enter name...");
// 	const name1 = await new Promise((resolve) => {
// 		process.stdin.once("data", (data) => {
// 			resolve(data.toString().trim());
// 		});
// 	});
// 	console.log(`Hello, ${name1}!`);
// 	// insert a row
// 	await db.insert(users).values({ name: `${name1}`, meow: "Meow!" });
// 	return;
// }
// async function DeleteEntry() {
// 	const result = await db.select().from(users);
// 	console.log(result);
// 	console.log("Select an entry to delete by id...");
// 	const idToDelete: number = await new Promise((resolve) => {
// 		process.stdin.once("data", (data) => {
// 			resolve(parseInt(data.toString().trim()));
// 		});
// 	});
// 	console.log(
// 		`Are you sure you want to delete entry with id ${idToDelete}? (y/n)`
// 	);
// 	const confirmDelete: string = await new Promise((resolve) => {
// 		process.stdin.once("data", (data) => {
// 			resolve(data.toString().trim());
// 		});
// 	});
// 	if (confirmDelete === "y") {
// 		await db.delete(users).where(eq(users.id, idToDelete));
// 		console.log(`Deleted entry with id ${idToDelete}`);
// 	} else {
// 		console.log("Delete cancelled.");
// 	}
// }

// main().catch(console.error);
