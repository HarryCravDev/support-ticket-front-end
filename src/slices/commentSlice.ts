import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import axios from "axios";

interface ICommentState {
	comments: any[];
	status: string;
	isError: boolean;
	isSuccess: boolean;
	message: string;
}
const initialState: ICommentState = {
	comments: [],
	status: "idle",
	isError: false,
	isSuccess: false,
	message: "",
};

// export const getCommentsAsync = createAsyncThunk(
// 	"ticket/create",
// 	async () => {
// 		console.log("Params: ");
// 		console.log("Authorization: ", localStorage.getItem("jwt"));

// 		try {
// 			const { data } = await axios.post(
// 				"http://localhost:4500/v1/api/ticket",
// 				{

// 				},
// 				{
// 					headers: {
// 						Authorization: `Bearer ${localStorage.getItem("jwt")}`,
// 					},
// 				}
// 			);

// 			console.log("Return from createTicketAsync", { data });

// 			return data.data;
// 		} catch (error) {
// 			console.error(error);
// 			return error;
// 		}
// 	}
// );

export const getCommentsAsync = createAsyncThunk(
	"comments/get",
	async ({ userId, ticketId }: { userId: string; ticketId: string }) => {
		console.log("Harry Craven Params: ", {
			userId,
			ticketId,
			url: `v1/api/notes/${userId}/${ticketId}`,
		});
		console.log("Authorization: ", localStorage.getItem("jwt"));

		try {
			const { data } = await axios.get(
				`http://localhost:4500/v1/api/notes/${userId}/${ticketId}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("jwt")}`,
					},
				}
			);

			console.log("Return from getCommentsAsync", { data });

			return data.data;
		} catch (error) {
			console.error(error);
			return error;
		}
	}
);

export const ticketSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {
		reset: (state) => {
			state.comments = [];
			state.status = "idle";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getCommentsAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getCommentsAsync.fulfilled, (state, action) => {
				console.log("Return payload from getCommentsAsync", { action });
				state.comments = action.payload;
				state.status = "idle";
			});
	},
});

export const { reset } = ticketSlice.actions;

export const selectComments = (state: RootState) => state.comments;

export default ticketSlice.reducer;
