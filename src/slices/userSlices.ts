import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import axios from "axios";

interface IUserState {
	user: any;
	isLoggedIn: boolean;
	jwt: string;
	status: "idle" | "loading" | "error" | "success";
}

const initialState: IUserState = {
	user: {},
	isLoggedIn: false,
	jwt: "",
	status: "idle",
};

export const userLoginAsync = createAsyncThunk(
	"user/login",
	async ({ email, password }: { email: string; password: string }) => {
		console.log("User Parameters: ", { email, password });
		try {
			const { data } = await axios.post(
				"http://localhost:4500/v1/api/users/login",
				{
					email,
					password,
				}
			);
			console.log("fetchFeedbackAsync", { data });
			return data.data;
		} catch (error) {
			console.error(error);
			return error;
		}
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(userLoginAsync.pending, (state) => {
				console.log("Loading feedback from server");
				state.status = "loading";
			})
			.addCase(userLoginAsync.fulfilled, (state, action) => {
				console.log("Got feedback from server", action.payload);
				const { _id, email, name, token } = action.payload;
				state.status = "idle";
				state.user = { email, name, _id };
				state.isLoggedIn = true;
				state.jwt = token;
			});
	},
});

export const {} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
