import React, { useState } from "react";
import { Input, Button, Alert } from "antd";
import "./commentInput.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createCommentAsync } from "../../slices/commentSlice";
import { selectTicket } from "../../slices/ticketingSlice";
import { selectUser } from "../../slices/userSlice";

const { TextArea } = Input;

const TicketCommentInput = () => {
	const dispatch = useAppDispatch();
	const { ticket, status: ticketStatus } = useAppSelector(selectTicket);
	const { user, status: userStatus } = useAppSelector(selectUser);
	const [comment, setComment] = useState("");
	const [alert, setAlert] = useState<{
		active: boolean;
		message: string;
		type: "success" | "info" | "error" | "warning";
	}>({ active: false, message: "", type: "success" });

	const onSubmitComment = async () => {
		if (comment.length < 10) {
			// todo - alert...
			setAlert({
				active: true,
				message: "Please enter a comment with at least 10 characters",
				type: "error",
			});

			const timer = setTimeout(() => {
				setAlert({ active: false, message: "", type: "success" });
				clearTimeout(timer);
			}, 3000);

			return;
		}

		try {
			await dispatch(
				createCommentAsync({
					ticketId: ticket._id,
					userId: user._id,
					comment,
				})
			);
		} catch (error) {
			console.log("Error: ", error);
		}

		setComment("");
	};

	return (
		<div>
			{alert.active && <Alert message={alert.message} type={alert.type} />}
			<TextArea
				onChange={(e) => setComment(e.target.value)}
				placeholder="Enter your comment here..."
				style={{ marginTop: "0.2rem" }}
				className={alert.type === "error" ? "comment-input-error" : ""}
				value={comment}
			/>
			<Button
				onClick={onSubmitComment}
				style={{ marginTop: "0.5rem" }}
				type="primary"
				disabled={!comment}
			>
				Submit
			</Button>
		</div>
	);
};

export default TicketCommentInput;
