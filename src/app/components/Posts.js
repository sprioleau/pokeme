import React from "react";
// import React, { useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import { selectPosts } from "../store/selectors";
// import { fetchPosts } from "../store/actions";

const Posts = () => {
	// const dispatch = useDispatch();
	// const posts = useSelector(selectPosts);

	// useEffect(() => {
	// 	dispatch(fetchPosts());
	// }, []);

	// if (posts.length === 0) return <h2>No posts availalble</h2>;

	return (
		<>
			<h1>Posts</h1>
			{/* <ul>
				{posts.map((post) => (
					<li key={post.id} className="post">
						<NavLink to={`cards/${post.id}`}>Go to Post</NavLink>
						<h3 className="post__title">{post.title}</h3>
						<img src={post.coverUrl} alt={post.title} />
						<p className="post__body">{post.content}</p>
						<ul className="post__tags">
							{[...new Set(post.tags.split(","))].map((tag) => (
								<li key={tag} className="post__tag">
									{tag}
								</li>
							))}
						</ul>
					</li>
				))}
			</ul> */}
		</>
	);
};

export default Posts;
