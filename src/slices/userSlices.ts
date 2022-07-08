import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import axios from "axios";
import IRegisterFormValues from "../types/IRegisterValues";

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

export const userRegisterAsync = createAsyncThunk(
	"user/register",
	async ({ email, name, password, confirmPassword }: IRegisterFormValues) => {
		try {
			const { data } = await axios.post(
				"http://localhost:4500/v1/api/users/register",
				{
					email,
					name,
					password,
					confirmPassword,
				}
			);
			console.log("register user: ", { data });
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
				state.status = "loading";
			})
			.addCase(userLoginAsync.fulfilled, (state, action) => {
				const { _id, email, name } = action.payload.user;
				state.status = "idle";
				state.user = { email, name, _id };
				state.isLoggedIn = true;
				state.jwt = action.payload.token;
			})
			.addCase(userRegisterAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(userRegisterAsync.fulfilled, (state, action) => {
				const { _id, email, name } = action.payload.user;
				state.status = "idle";
				state.user = { email, name, _id };
				state.isLoggedIn = true;
				state.jwt = action.payload.token;
			});
	},
});

export const {} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
