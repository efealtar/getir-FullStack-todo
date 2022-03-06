import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IState } from "../types/types";
import axios from "axios";
import { toast } from "react-toastify";

const base_url = "http://localhost:5000";

const requestApi = axios.create({
	baseURL: base_url,
});

export const getTodosAsync = createAsyncThunk("todos/get-todos", () =>
	requestApi
		.get("/get-todos")
		.then((response) => response.data)
		.catch((error) => error)
);

export const addTodo = createAsyncThunk("todos/add-todo", (payload: string) =>
	requestApi
		.post("/add-todo", { todoText: payload })
		.then((response) => response.data)
		.catch((error) => error)
);

export const removeTodo = createAsyncThunk(
	"todos/delete-todo",
	(payload: string) =>
		requestApi
			.delete("/delete-todo", { data: { id: payload } })
			.then((response) => response.data)
			.catch((error) => error)
);

export const updateTodo = createAsyncThunk(
	"todos/update-todo",
	(payload: { id: string; updateText: string; updateCompleted: boolean }) =>
		requestApi
			.put("/update-todo", {
				id: payload.id,
				todoText: payload.updateText,
				completed: payload.updateCompleted,
			})
			.then((response) => response.data)
			.catch((error) => error)
);

const initialState: IState = {
	todos: [],
	status: "idle",
};

const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			//immerJS based state control here because of that remove and update done with index
			.addCase(getTodosAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getTodosAsync.fulfilled, (state, { payload }) => {
				state.status = "done";
				state.todos = payload;
			})
			.addCase(addTodo.fulfilled, (state, { payload }) => {
				state.todos.push(payload);
				toast.success("New Todo Added!");
			})
			.addCase(removeTodo.fulfilled, (state, { payload }) => {
				const index = state.todos.findIndex((todo) => todo.id === payload);
				state.todos.splice(index, 1);
				toast.error("Todo Deleted!");
			})
			.addCase(updateTodo.fulfilled, (state, { payload }) => {
				const index = state.todos.findIndex((todo) => todo.id === payload.id);

				state.todos[index] = payload;

				toast.info("Todo Updated!");
			});
	},
});
export default todoSlice.reducer;
