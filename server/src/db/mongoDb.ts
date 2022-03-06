import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const uri: string = process.env.URI!;

export const start = async () => {
	await mongoose.connect(uri);
};
