import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HeadTitle from "./components/HeadTitle";
import ListItems from "./components/ListItems";
import Loading from "./components/Loading";
import { getTodosAsync } from "./redux/feature/todoSlice";

function App() {
	//Getting the state when app start
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getTodosAsync());
	}, [dispatch]);

	const { status } = useSelector((state: any) => state);

	return (
		<>
			<Container maxWidth='md'>
				<HeadTitle />
				{status === "loading" ? <Loading /> : <ListItems />}
			</Container>
			<ToastContainer
				position='bottom-right'
				autoClose={1500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</>
	);
}

export default App;
