export interface Todo {
	id: string;
	todoText: string;
	completed: boolean;
}

export interface IState {
	todos: Todo[];
	status: "idle" | "loading" | "done";
}
