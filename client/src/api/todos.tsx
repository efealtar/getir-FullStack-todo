import axios from "axios";
import { Todo } from "../redux/types/types";

const base_url = "http://localhost:5000";

const requestApi = axios.create({
	baseURL: base_url,
});

export const fetchTodos = () => requestApi.get<Todo[]>("/get-todos");
