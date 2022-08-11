import React from "react";
import IComment from "../../types/IComment";
import TicketComment from "../ticket-comment/TicketComment";


const TicketCommentContainer: React.FC<{ comments: IComment[] }> = ({
	comments = [],
}) => {
	return (
		<div>
			{comments.length > 0 &&
				comments?.map((comment, index) => (
					<TicketComment
						key={index}
						author={comment.username}
						comment={comment.comment}
						datetime={comment.createdAt}
						avatar={`https://joeschmoe.io/api/v1/${comment.username}`}
					/>
				))}
		</div>
	);
};

export default TicketCommentContainer;
