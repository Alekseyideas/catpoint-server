import { createConnection } from "typeorm";
import path from "path";
import { User } from "../entities";
import { DB_URL } from "./const";

export const connectToDb = async () => {
  try {
    await createConnection({
      type: "postgres",
      url: DB_URL,
      migrations: [path.join(__dirname, "./migrations/*")],
      entities: [User],
    });
    console.log("✅ Database was connected");
  } catch (e) {
    console.log("❌ connectToDb -> e", e);
  }
};