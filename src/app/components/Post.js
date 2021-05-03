import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoTrashOutline } from "react-icons/io5";

import * as actions from "../store/actions";
import { selectCurrentPost } from "../store/selectors";

const Post = () => {
	const post = useSelector(selectCurrentPost);
	const { postId } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	const handleDeletePost = () => dispatch(actions.deletePost(postId, history));

	useEffect(() => {
		dispatch(actions.fetchPost(postId));
	}, []);

	if (!post) return null;

	return (
		<li className="post">
			<h3 className="post__title">{post?.title}</h3>
			<img src={post?.coverUrl} alt={post?.title} width="250" height="auto" />
			<p className="post__body">{post?.content}</p>
			<ul className="post__tags">
				{[...new Set(post?.tags?.split(","))].map((tag) => (
					<li key={tag} className="post__tag">
						{tag}
					</li>
				))}
			</ul>
			<footer className="post__toolbar">
				<p className="post__toolbar-icon icon delete" onClick={handleDeletePost}>
					<IoTrashOutline />
				</p>
			</footer>
		</li>
	);
};

export default Post;
