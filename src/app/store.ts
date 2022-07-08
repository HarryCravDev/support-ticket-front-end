import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// import counterReducer from "../features/counter/counterSlice";
import feedbackReducer from "../slices/feedbackSlices";
import userReducer from "../slices/userSlices";

export const store = configureStore({
	reducer: {
		feedback: feedbackReducer,
		user: userReducer,
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
