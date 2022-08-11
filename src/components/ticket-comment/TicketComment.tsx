import React from "react";
import { Comment, Avatar } from "antd";

const TicketComment: React.FC<{
	author: string;
	avatar?: string;
	comment: string;
	datetime: string;
}> = ({ author = "No username", avatar, comment, datetime }) => {
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
				datetime={new Date(datetime).toLocaleString()}
			/>
		</div>
	);
};

export default TicketComment;
