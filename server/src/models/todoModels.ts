import { model, Schema } from "mongoose";

interface ModelType {
	id: string;
	todoText: string | null;
	completed: boolean;
}

const todoSchema: Schema = new Schema({
	id: {
		type: String,
		required: true,
	},

	todoText: {
		type: String,
	},

	completed: {
		type: Boolean,
		default: false,
	},
});

//Version and _id deleted from response
todoSchema.set("toJSON", {
	transform: function (doc, ret, options) {
		delete ret._id;
		delete ret.__v;
	},
});

export default model<ModelType>("Todo", todoSchema);
