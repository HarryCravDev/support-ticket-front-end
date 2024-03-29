import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// import counterReducer from "../features/counter/counterSlice";
import userReducer from "../slices/userSlice";
import ticketReducer from "../slices/ticketingSlice";
import commentReducer from "../slices/commentSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		ticket: ticketReducer,
		comments: commentReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
