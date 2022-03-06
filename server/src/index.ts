//dotenv configuration
import * as dotenv from "dotenv";
dotenv.config();

//express imports
import express, { Express } from "express";

//routes import
import todoRoutes from "./routes/todosRoutes";
export const app: Express = express();

import { start } from "./db/mongoDb";

import cors from "cors";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route middleware
app.use(todoRoutes);
//connectDb and start
const PORT = process.env.PORT || 5000;
start()
	.then(() =>
		app.listen(PORT, () => console.log(`Server running on port:${PORT}`))
	)
	.catch((error) => {
		throw error;
	});
