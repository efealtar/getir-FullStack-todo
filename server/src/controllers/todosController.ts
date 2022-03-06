import { Response, Request } from "express";
import Todo from "../models/todoModels";
import { v4 as uuidv4 } from "uuid";

export const getTodos = async (req: Request, res: Response) => {
	try {
		const todos = await Todo.find();
		return res.status(200).json(todos);
	} catch (error) {
		return res.status(500).json({ error });
	}
};

export const addTodo = async (req: Request, res: Response) => {
	try {
		const { todoText } = req.body;

		const todoId = uuidv4();
		const newTodo = new Todo({ id: todoId, todoText });

		await newTodo.save();

		return res.status(201).json(newTodo);
	} catch (error) {
		return res.status(500).json({ message: "Something went wrong!" });
	}
};

export const updateTodo = async (req: Request, res: Response) => {
	try {
		const updatedTodo = await Todo.findOneAndUpdate(
			{ id: req.body.id },
			{
				todoText: req.body.todoText,
				completed: req.body.completed,
			},
			{ new: true }
		);

		return res.status(200).json(updatedTodo);
	} catch (error) {
		return res.status(500).json({ error });
	}
};

export const deleteTodo = async (req: Request, res: Response) => {
	try {
		await Todo.deleteOne({ id: req.body.id });

		return res.status(200).json(req.body.id);
	} catch (error) {
		return res.status(500).json({ message: "Something went wrong!" });
	}
};
