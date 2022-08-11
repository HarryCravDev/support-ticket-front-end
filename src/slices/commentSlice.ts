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

interface INoteComment {
	userId: string;
	ticketId: string;
	comment: string;
	isStaff?: boolean;
	staff?: string;
}

export const createCommentAsync = createAsyncThunk(
	"comments/create",
	// async ({ tickedId }: { tickedId: string,  }) => {
	async ({ ticketId, userId, comment }: INoteComment) => {
		console.log("Params: createCommentAsync ", {
			ticketId,
			userId,
			comment,
		});
		console.log("Authorization: ", localStorage.getItem("jwt"));

		try {
			const { data } = await axios.post(
				`http://${import.meta.env.VITE_IP}:4500/v1/api/notes/${ticketId}`,
				{
					ticketId,
					userId,
					comment,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("jwt")}`,
					},
				}
			);

			console.log("Return from createCommentAsync", { data });

			return data.data;
		} catch (error) {
			console.error(error);
			return error;
		}
	}
);

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
				`http://${
					import.meta.env.VITE_IP
				}:4500/v1/api/notes/${userId}/${ticketId}`,
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
			})
			.addCase(createCommentAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(createCommentAsync.fulfilled, (state, action) => {
				console.log("Return payload from createCommentAsync", { action });
				state.comments = action.payload;
				state.status = "idle";
			});
	},
});

export const { reset } = ticketSlice.actions;

export const selectComments = (state: RootState) => state.comments;

export default ticketSlice.reducer;
