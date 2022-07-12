import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../slices/userSlice";

const useAuthStatus = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [checkingStatus, setCheckingStatus] = useState(true);
	const { user } = useAppSelector(selectUser);

	useEffect(() => {
		if (user._id) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
		setCheckingStatus(false);
	}, [user]);

	return { isLoggedIn, checkingStatus };
};

export default useAuthStatus;
