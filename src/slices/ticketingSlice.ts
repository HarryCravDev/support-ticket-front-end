import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import axios from "axios";
import ICreateTicket from "../types/ICreateTicket";

interface ITicketState {
	tickets: any[];
	// todo - Please type this!!
	ticket: any;
	status: string;
	isError: boolean;
	isSuccess: boolean;
	message: string;
}

const initialState: ITicketState = {
	tickets: [],
	ticket: {},
	status: "idle",
	isError: false,
	isSuccess: false,
	message: "",
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

export const getTicketAsync = createAsyncThunk(
	"ticket/getTicket",
	async ({ userId, ticketId }: { userId: string; ticketId: string }) => {
		console.log("Authorization: ", localStorage.getItem("jwt"));
		try {
			const { data } = await axios.get(
				`http://localhost:4500/v1/api/ticket/${ticketId}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("jwt")}`,
						userId,
					},
				}
			);

			console.log("Return from getTicket 1", { data });

			return data.data;
		} catch (error) {
			console.error(error);
			return error;
		}
	}
);

export const updateTicketAsync = createAsyncThunk(
	"ticket/closeTicket",
	// todo - Please type updateTicket!!
	async (updateTicketData: {
		ticketId: string;
		userId: string;
		product: string;
		description: string;
		status: string;
	}) => {
		console.log("Authorization: ", localStorage.getItem("jwt"));

		console.log("updateTicketAsync firing ... params : ", updateTicketData);

		const updateTicket: {
			userId: string;
			product: string;
			description: string;
			status: string;
		} = {
			userId: updateTicketData.userId,
			product: updateTicketData.product,
			description: updateTicketData.description,
			status: updateTicketData.status,
		};

		try {
			const { data } = await axios.put(
				`http://localhost:4500/v1/api/ticket/${updateTicketData.ticketId}`,
				updateTicket,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("jwt")}`,
					},
				}
			);

			console.log("Return from updateTicketAsync ", { data });

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
			})
			.addCase(getTicketAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getTicketAsync.fulfilled, (state, action) => {
				console.log("Return payload from getTicketAsync", { action });
				// todo - add to message
				state.ticket = action.payload;
				state.status = "idle";
			})
			.addCase(updateTicketAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(updateTicketAsync.fulfilled, (state, action) => {
				console.log("Return payload from updateTicketAsync", { action });
				state.ticket = action.payload;
				state.status = "idle";
			});
	},
});

export const { reset } = ticketSlice.actions;

export const selectTicket = (state: RootState) => state.ticket;

export default ticketSlice.reducer;
