import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/home-screen/Home";
import Login from "./screens/login-screen/Login";
import Register from "./screens/register-screen/Register";
import Header from "./components/header/Header";
import Drawer from "./components/drawer/Drawer";
import TicketMenu from "./screens/ticket-menu-screen/TicketMenu";
import PrivateRoute from "./components/private-route/PrivateRoute";
import NewTicket from "./screens/new-ticket/NewTicket";
import DisplayTickets from "./screens/display-tickets-screen/DisplayTickets";

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
					<Route path="/new-ticket" element={<PrivateRoute />}>
						<Route path="/new-ticket" element={<NewTicket />} />
					</Route>
					<Route path="/tickets" element={<PrivateRoute />}>
						<Route path="/tickets" element={<DisplayTickets />} />
					</Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
