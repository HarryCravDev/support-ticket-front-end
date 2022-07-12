import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import axios from "axios";
import ICreateTicket from "../types/ICreateTicket";

// interface IUserState {
// 	user: any;
// 	isLoggedIn: boolean;
// 	jwt: string;
// 	status: "idle" | "loading" | "error" | "success";
// }

const initialState: { tickets: any[]; status: string } = {
	tickets: [],
	status: "idle",
};

export const createTicketAsync = createAsyncThunk(
	"ticket/create",
	async ({ userId, email, name, description, product }: ICreateTicket) => {
		console.log("Params: ", { userId, email, name, description, product });
		console.log("Authorization: ", localStorage.getItem("jwt"));
		try {
			const { data } = await axios.post(
				"http://localhost:4500/v1/api/ticket",
				{
					userId,
					email,
					name,
					description,
					product,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("jwt")}`,
					},
				}
			);

			console.log("Return from createTicketAsync", { data });

			return data.data;
		} catch (error) {
			console.error(error);
			return error;
		}
	}
);

export const ticketSlice = createSlice({
	name: "ticket",
	initialState,
	reducers: {
		reset: (state) => {
			state.tickets = [];
			state.status = "idle";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createTicketAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(createTicketAsync.fulfilled, (state, action) => {
				console.log("Return payload from createTicketAsync", { action });
				// const { _id, email, name } = action.payload.ticket;
				state.status = "idle";
			});
	},
});

export const { reset } = ticketSlice.actions;

export const selectTicket = (state: RootState) => state;

export default ticketSlice.reducer;
