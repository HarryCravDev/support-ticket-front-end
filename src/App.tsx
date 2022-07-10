import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/home-screen/Home";
import Login from "./screens/login-screen/Login";
import Register from "./screens/register-screen/Register";
import Header from "./components/header/Header";
import Drawer from "./components/drawer/Drawer";
import TicketMenu from "./screens/ticket-menu-screen/TicketMenu";

function App() {
	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/ticket-menu" element={<TicketMenu />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
