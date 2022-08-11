import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser } from "../../slices/userSlice";
import TicketComment from "../ticket-comment/TicketComment";
import { getCommentsAsync, selectComments } from "../../slices/commentSlice";
import { selectTicket } from "../../slices/ticketingSlice";

const TicketCommentContainer = () => {
	const { comments, isError, status } = useAppSelector(selectComments);
	const { user } = useAppSelector(selectUser);
	const { ticket } = useAppSelector(selectTicket);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getCommentsAsync({ userId: user._id, ticketId: ticket._id }));
	}, []);

	return (
		<div>
			{comments.length > 0 &&
				comments?.map((comment, index) => (
					<TicketComment key={index} author="Harry" comment={comment.comment} />
				))}
		</div>
	);
};

export default TicketCommentContainer;
