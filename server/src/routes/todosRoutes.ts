import { Router } from "express";
import {
	addTodo,
	deleteTodo,
	getTodos,
	updateTodo,
} from "../controllers/todosController";

const router: Router = Router();

router.get("/get-todos", getTodos);
router.post("/add-todo", addTodo);
router.put("/update-todo", updateTodo);
router.delete("/delete-todo", deleteTodo);

export default router;
