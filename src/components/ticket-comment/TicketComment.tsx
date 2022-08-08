import React from "react";
import { Comment, Avatar } from "antd";

const TicketComment: React.FC<{
	author: string;
	avatar?: string;
	comment: string;
}> = ({ author = "No username", avatar, comment }) => {
	return (
		<div>
			<Comment
				author={<a>{author}</a>}
				avatar={
					<Avatar
						src={avatar ? avatar : "https://joeschmoe.io/api/v1/random"}
						alt="Han Solo"
					/>
				}
				content={<p>{comment}</p>}
			/>
		</div>
	);
};

export default TicketComment;
