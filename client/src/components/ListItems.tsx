import Paper from "@mui/material/Paper";
import List from "@mui/material/List";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import SingleItem from "./SingleItem";

const ListItems = () => {
	const { todos } = useSelector((state: RootState) => state);

	return (
		<Paper style={{ maxHeight: "70vh", overflow: "auto" }}>
			<List>
				{todos.map((todo) => (
					<SingleItem todo={todo} key={todo.id} />
				))}
			</List>
		</Paper>
	);
};

export default ListItems;
