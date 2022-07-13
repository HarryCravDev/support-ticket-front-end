import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import axios from "axios";
import ICreateTicket from "../types/ICreateTicket";

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

export const getTicketsAsync = createAsyncThunk(
	"ticket/getTickets",
	async () => {
		console.log("Authorization: ", localStorage.getItem("jwt"));
		try {
			const { data } = await axios.get("http://localhost:4500/v1/api/ticket", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			});

			console.log("Return from getTickets", { data });

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
				console.log("Return payload from getTicketsAsync", { action });
				// const { _id, email, name } = action.payload.ticket;
				state.status = "idle";
			})
			.addCase(getTicketsAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getTicketsAsync.fulfilled, (state, action) => {
				console.log("Return payload from getTicketsAsync", { action });
				state.tickets = action.payload;
				state.status = "idle";
			});
	},
});

export const { reset } = ticketSlice.actions;

export const selectTicket = (state: RootState) => state.ticket;

export default ticketSlice.reducer;
